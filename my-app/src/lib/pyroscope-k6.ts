type PyroscopeModule = {
  getLabels?: () => Record<string, string | number>;
  setLabels: (labels: Record<string, string | number>) => void;
};

let pyroscopeModulePromise: Promise<PyroscopeModule> | null = null;

function decodeBaggageValue(value: string) {
  const trimmed = value.trim();

  try {
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

function normalizeK6LabelKey(rawKey: string) {
  // k6 emits baggage keys with dots (for example `k6.test_run_id`), while the
  // Profiles UI expects underscore labels like `k6_test_run_id`.
  return rawKey.trim().replace(/\./g, '_');
}

export function parseK6BaggageLabels(rawBaggage: string | null) {
  if (!rawBaggage) {
    return {};
  }

  return rawBaggage.split(',').reduce<Record<string, string>>((labels, entry) => {
    const keyValuePart = entry.split(';', 1)[0]?.trim() ?? '';
    const separatorIndex = keyValuePart.indexOf('=');

    if (separatorIndex === -1) {
      return labels;
    }

    const key = keyValuePart.slice(0, separatorIndex).trim();
    const value = decodeBaggageValue(keyValuePart.slice(separatorIndex + 1));
    const normalizedKey = normalizeK6LabelKey(key);

    if (normalizedKey.startsWith('k6_') && value) {
      labels[normalizedKey] = value;
    }

    return labels;
  }, {});
}

async function loadPyroscopeModule() {
  if (!pyroscopeModulePromise) {
    pyroscopeModulePromise = new Function(
      'return import("@pyroscope/nodejs")',
    )().then((module: { default: PyroscopeModule }) => module.default);
  }

  return pyroscopeModulePromise;
}

export async function withK6ProfileLabels<T>(
  request: Request,
  operation: () => T | Promise<T>,
) {
  const labels = parseK6BaggageLabels(request.headers.get('baggage'));

  if (Object.keys(labels).length === 0) {
    return operation();
  }

  const Pyroscope = await loadPyroscopeModule();
  let previousLabels: Record<string, string | number> = {};
  let shouldRestore = false;

  try {
    if (typeof Pyroscope.getLabels === 'function') {
      try {
        previousLabels = { ...Pyroscope.getLabels() };
        shouldRestore = true;
      } catch {
        previousLabels = {};
      }
    }

    try {
      Pyroscope.setLabels(labels);
    } catch {
      return await operation();
    }

    return await operation();
  } finally {
    try {
      Pyroscope.setLabels(shouldRestore ? previousLabels : {});
    } catch {
      // Profiling should never break the API response.
    }
  }
}

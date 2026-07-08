import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import pyroscope from 'https://jslib.k6.io/http-instrumentation-pyroscope/1.0.1/index.js';

pyroscope.instrumentHTTP();

const serverDurationMs = new Trend('server_duration_ms');

function readEnv(name, fallback) {
  const value = __ENV[name];

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed) {
      return trimmed;
    }
  }

  return fallback;
}

function readNumberEnv(name, fallback, { min, max } = {}) {
  const value = readEnv(name, '');

  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  const rounded = Math.floor(parsed);

  if (typeof min === 'number' && rounded < min) {
    return min;
  }

  if (typeof max === 'number' && rounded > max) {
    return max;
  }

  return rounded;
}

const baseUrl = readEnv('BASE_URL', 'https://l24-agency.vercel.app');
const complexVariant = readEnv('COMPLEX_VARIANT', 'optimized').toLowerCase();
const expectedStrategy = complexVariant === 'naive' ? 'naive-loop' : 'precomputed-sieve';
const complexLimit = readNumberEnv('COMPLEX_LIMIT', 50000, { min: 1_000, max: 100_000 });
const vus = readNumberEnv('COMPLEX_VUS', readNumberEnv('VUS', 5), { min: 1 });
const duration = readEnv('DURATION', '30s');

export const options = {
  scenarios: {
    calcul_complexe: {
      executor: 'constant-vus',
      vus,
      duration,
      exec: 'testCalculComplexe',
    },
  },
};

function assertJson(response, label) {
  if (!response || !response.body) {
    throw new Error(
      `${label} request failed: ${response && response.error ? response.error : 'empty body'}`,
    );
  }

  const isValid = check(response, {
    [`${label} status is 200`]: (r) => r.status === 200,
    [`${label} has json`]: (r) =>
      ((r.headers['Content-Type'] || r.headers['content-type'] || '')).includes('application/json'),
  });

  if (!isValid) {
    throw new Error(`${label} did not return a JSON response`);
  }
}

export function testCalculComplexe() {
  const response = http.get(
    `${baseUrl}/api/calcul-complexe?limit=${complexLimit}&variant=${complexVariant}`,
  );
  assertJson(response, '/api/calcul-complexe');

  const payload = response.json();
  check(payload, {
    'calcul complexe returns the expected limit': (data) => data.limit === complexLimit,
    'calcul complexe returns a prime count': (data) => typeof data.primeCount === 'number',
    'calcul complexe returns duration': (data) => typeof data.durationMs === 'number',
    'calcul complexe uses the expected strategy': (data) => data.strategy === expectedStrategy,
  });
  serverDurationMs.add(payload.durationMs);

  sleep(1);
}

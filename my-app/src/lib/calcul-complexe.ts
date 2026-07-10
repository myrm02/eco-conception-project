const DEFAULT_LIMIT = 50_000;
const MAX_LIMIT = 100_000;
const MIN_LIMIT = 1_000;
const MODULO = 1_000_000_007;

export type ComplexCalculationVariant = 'optimized' | 'naive';

export type ComplexCalculationResult = {
  limit: number;
  primeCount: number;
  lastPrime: number;
  checksum: number;
  strategy: 'precomputed-sieve' | 'naive-loop';
};

type ComplexCalculationTable = {
  primeCountByLimit: Uint32Array;
  lastPrimeByLimit: Uint32Array;
  checksumByLimit: Uint32Array;
};

function parseInteger(value: string | null) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_LIMIT;
  }

  return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, Math.floor(parsed)));
}

function buildComplexCalculationTable(maxLimit: number): ComplexCalculationTable {
  const isComposite = new Uint8Array(maxLimit + 1);
  const primeCountByLimit = new Uint32Array(maxLimit + 1);
  const lastPrimeByLimit = new Uint32Array(maxLimit + 1);
  const checksumByLimit = new Uint32Array(maxLimit + 1);

  let primeCount = 0;
  let lastPrime = 2;
  let checksum = 0;

  for (let candidate = 2; candidate <= maxLimit; candidate += 1) {
    if (!isComposite[candidate]) {
      primeCount += 1;
      lastPrime = candidate;

      for (let multiple = candidate + candidate; multiple <= maxLimit; multiple += candidate) {
        isComposite[multiple] = 1;
      }

      checksum = (checksum + candidate * primeCount) % MODULO;
    } else {
      checksum = (checksum + candidate) % MODULO;
    }

    primeCountByLimit[candidate] = primeCount;
    lastPrimeByLimit[candidate] = lastPrime;
    checksumByLimit[candidate] = checksum;
  }

  return {
    primeCountByLimit,
    lastPrimeByLimit,
    checksumByLimit,
  };
}

function isPrime(candidate: number) {
  if (candidate < 2) return false;
  if (candidate === 2) return true;
  if (candidate % 2 === 0) return false;

  const maxDivisor = Math.floor(Math.sqrt(candidate));

  for (let divisor = 3; divisor <= maxDivisor; divisor += 2) {
    if (candidate % divisor === 0) {
      return false;
    }
  }

  return true;
}

function runNaiveComplexCalculation(limit: number) {
  let primeCount = 0;
  let lastPrime = 2;
  let checksum = 0;

  for (let candidate = 2; candidate <= limit; candidate += 1) {
    if (isPrime(candidate)) {
      primeCount += 1;
      lastPrime = candidate;
      checksum = (checksum + candidate * primeCount) % MODULO;
    } else {
      checksum = (checksum + candidate) % MODULO;
    }
  }

  return { primeCount, lastPrime, checksum };
}

// Build the lookup table once so each request only reads cached values.
const complexCalculationTable = buildComplexCalculationTable(MAX_LIMIT);

export function parseComplexLimit(rawLimit: string | null) {
  return parseInteger(rawLimit);
}

export function parseComplexVariant(rawVariant: string | null): ComplexCalculationVariant {
  return rawVariant === 'naive' ? 'naive' : 'optimized';
}

export function getComplexCalculation(
  limit: number,
  variant: ComplexCalculationVariant = 'optimized',
): ComplexCalculationResult {
  const normalizedLimit = Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, Math.floor(limit)));

  if (variant === 'naive') {
    const result = runNaiveComplexCalculation(normalizedLimit);

    return {
      limit: normalizedLimit,
      ...result,
      strategy: 'naive-loop',
    };
  }

  return {
    limit: normalizedLimit,
    primeCount: complexCalculationTable.primeCountByLimit[normalizedLimit],
    lastPrime: complexCalculationTable.lastPrimeByLimit[normalizedLimit],
    checksum: complexCalculationTable.checksumByLimit[normalizedLimit],
    strategy: 'precomputed-sieve',
  };
}

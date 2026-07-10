import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import pyroscope from 'https://jslib.k6.io/http-instrumentation-pyroscope/1.0.1/index.js';

pyroscope.instrumentHTTP();

const serverDurationMs = new Trend('server_duration_ms');

const baseUrl = 'https://l24-agency.vercel.app';
const complexVariant = 'optimized';
const expectedStrategy = 'precomputed-sieve';
const complexLimit = 50_000;
const vus = 5;
const duration = '1m';

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

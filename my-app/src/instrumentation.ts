export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Pyroscope = await import('@pyroscope/nodejs');

    Pyroscope.default.init({
      serverAddress: process.env.PYROSCOPE_URL!,
      appName: 'eco-conception-project',
      basicAuthUser: process.env.PYROSCOPE_USER!,
      basicAuthPassword: process.env.PYROSCOPE_TOKEN!,
      tags: { env: 'production' },
    });

    Pyroscope.default.start();
  }
}

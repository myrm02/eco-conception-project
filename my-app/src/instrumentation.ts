export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.platform !== 'win32') {
    const { default: Pyroscope } = await import('@pyroscope/nodejs');

    Pyroscope.init({
      serverAddress: process.env.PYROSCOPE_URL!,
      appName: 'eco-conception-project',
      basicAuthUser: process.env.PYROSCOPE_USER!,
      basicAuthPassword: process.env.PYROSCOPE_TOKEN!,
    });

    Pyroscope.start();
  }
}

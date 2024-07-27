import 'dotenv/config';
import path from 'path';

let appHost = process.env.APP_HOST ?? 'http://127.0.0.1';

if (!appHost.startsWith('http')) {
  appHost = `https://${appHost}`;
}

export const APP_HOST = appHost;
export const APP_PREFIX = process.env.APP_PREFIX ?? '';

export const APP_VERSION = process.env.APP_VERSION ?? 'local';
export const APP_PORT = +(process.env.APP_PORT ?? '4000');
export const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';

export const STORAGE_ADAPTER = process.env.STORAGE_ADAPTER ?? 'local';
export const STORAGE_PATH = process.env.STORAGE_PATH ?? path.resolve(__dirname, `../public/`);

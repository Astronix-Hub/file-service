import 'dotenv/config';

export const APP_VERSION = process.env.APP_VERSION ?? 'local';
export const APP_PORT = +(process.env.APP_PORT ?? '4000');
export const APP_HOST = process.env.APP_HOST ?? 'http://localhost:3000';
export const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';

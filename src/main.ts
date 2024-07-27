import Koa from 'koa';
import KoaRouter from 'koa-router';
import { APP_PORT, APP_VERSION } from './config';
import logger from './domain/utils/logger';

const app = new Koa();
const router = new KoaRouter();

// Version Info
router.get('/file-service/version', '/file-service/version', (ctx) => {
  ctx.body = `Astronix File-Service version: ${APP_VERSION}`;
});

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

async function run() {
  app.listen(APP_PORT);
  logger.info(`Astronix File-Service startup on http://127.0.0.1:${APP_PORT}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

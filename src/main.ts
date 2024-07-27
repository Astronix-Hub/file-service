import { createRouteExplorer } from 'altair-koa-middleware';
import { createYoga } from 'graphql-yoga';
import Koa from 'koa';
import mount from 'koa-mount';
import KoaRouter from 'koa-router';
import Static from 'koa-static';
import path from 'path';
import { buildSchemaSync } from 'type-graphql';
import { DemoResolver } from './api/graphql/resolvers/demo.resolver';
import { APP_PORT, APP_VERSION } from './config';
import logger from './domain/utils/logger';

const app = new Koa();
const router = new KoaRouter();

// Version Info
router.get('/file-service/version', '/file-service/version', (ctx) => {
  ctx.body = `Astronix File-Service version: ${APP_VERSION}`;
});

// GraphQL 调试工具
createRouteExplorer({
  url: '/file-service',
  router,
  opts: {
    endpointURL: '/file-service',
    subscriptionsEndpoint: `ws://localhost:${APP_PORT}/subscriptions`,
    initialQuery: `{ demo }`,
  },
});

// Yoga GraphQL Server
const yoga = createYoga({
  landingPage: false,
  graphqlEndpoint: '/file-service',
  cors: true,
  schema: buildSchemaSync({
    resolvers: [DemoResolver],
  }),
});

// 注册 yoga
router.post('yoga', '/file-service', async (ctx) => {
  const { status, body, headers } = await yoga.handleNodeRequestAndResponse(ctx.req, ctx.res, ctx as any);
  headers.forEach((value, key) => ctx.append(key, value));
  ctx.status = status;
  ctx.body = body;
});

// 注册路由
app.use(router.routes()).use(router.allowedMethods());
app.use(mount('/files', Static(path.resolve(__dirname, '../public'))));

async function run() {
  app.listen(APP_PORT);
  logger.info(`Astronix File-Service startup on http://127.0.0.1:${APP_PORT}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

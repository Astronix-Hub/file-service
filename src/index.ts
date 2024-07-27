import logger from './domain/utils/logger';

interface Checker {
  name: string;
  check: () => Promise<void>;
  skip?: boolean;
}

const checks: Checker[] = [];

async function preCheck() {
  logger.info('[ 预检开始 ]');

  for await (const [index, checker] of checks.entries()) {
    logger.info(`${index + 1}. ${checker.name}`);
    try {
      if (checker.skip) {
        logger.warn(`${index + 1}. ${checker.name} [跳过]`);
        continue;
      }
      await checker.check();
      logger.info(`${index + 1}. ${checker.name} [成功]`);
    } catch (error) {
      logger.error(`${index + 1}. ${checker.name} [失败]`);
      throw error;
    }
  }

  logger.info('[ 预检完成 ]');
}

preCheck().then(async () => {
  await import('./main');
});

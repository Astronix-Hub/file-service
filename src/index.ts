import 'reflect-metadata';
import logger from './domain/utils/logger';

interface Checker {
  name: string;
  check: () => Promise<void>;
  skip?: boolean;
}

const checks: Checker[] = [];

async function preCheck() {
  logger.info('[ Pre-check started... ]');

  for await (const [index, checker] of checks.entries()) {
    logger.info(`${index + 1}. ${checker.name}`);
    try {
      if (checker.skip) {
        logger.warn(`${index + 1}. ${checker.name} [skip]`);
        continue;
      }
      await checker.check();
      logger.info(`${index + 1}. ${checker.name} [success]`);
    } catch (error) {
      logger.error(`${index + 1}. ${checker.name} [failed]`);
      throw error;
    }
  }

  logger.info('[ Pre-check completed! ]');
}

preCheck().then(async () => {
  await import('./main');
});

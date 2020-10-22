import getDatabase from '../../bootstrap/database';
import logger from '../../helpers/logger';

const log = logger.child({
  name: 'healthCheck',
});

type HealthComponent = {
  name: string,
  status: boolean
}

async function checkDatabase(): Promise<HealthComponent> {
  try {
    const db = await getDatabase();
    await db.query('SELECT 1 + 1');
    return {
      name: 'sql',
      status: true,
    };
  } catch (err) {
    log.error(`Failed to connect to SQL instance: ${err.message}`);
    return {
      name: 'sql',
      status: false,
    };
  }
}

export default async function healthCheck(): Promise<HealthComponent[]> {
  return Promise.all([checkDatabase()]);
}

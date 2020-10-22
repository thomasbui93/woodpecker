import { Connection, createConnection } from 'typeorm';

let connection: any = null;

export default async function getDatabase(): Promise<Connection> {
  if (connection) return connection;
  connection = await createConnection();
  return connection;
}

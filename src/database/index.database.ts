import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {

  const default_options = await getConnectionOptions();

  return createConnection(
    Object.assign(default_options, {
      database: process.env.NODE_ENV === 'test' ? './src/database/database.test.sqlite' : default_options.database
    })
  )
}
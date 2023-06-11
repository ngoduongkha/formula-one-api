import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { POSTGRES } from 'src/environments';
import { NamingStrategy } from 'src/utils/naming-strategy';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: POSTGRES.HOST,
  port: POSTGRES.PORT,
  username: POSTGRES.USER,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DATABASE,
  entities: [resolve(__dirname, '**/*.entity.{js,ts}')],
  seeds: [resolve(__dirname, '**/*.seed.{js,ts}')],
  namingStrategy: new NamingStrategy(),
  synchronize: true,
};

export default new DataSource(options);

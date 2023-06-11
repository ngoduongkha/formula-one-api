import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { POSTGRES } from 'src/environments';
import { NamingStrategy } from 'src/utils/naming-strategy';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: POSTGRES.HOST,
      port: POSTGRES.PORT,
      username: POSTGRES.USER,
      password: POSTGRES.PASSWORD,
      database: POSTGRES.DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      namingStrategy: new NamingStrategy(),
    };
  }
}

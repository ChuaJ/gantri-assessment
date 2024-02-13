import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Art } from '../entities/Art';
import { Comment } from '../entities/Comment';
import {
  postgresDatabase,
  postgresHost,
  postgresPassword,
  postgresPort,
  postgresUsername,
} from './config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: postgresHost,
  port: postgresPort,
  username: postgresUsername,
  password: postgresPassword,
  database: postgresDatabase,
  logging: true,
  entities: [Art, Comment, User],
  migrations: ['src/migration/*.ts'],
  synchronize: true,
});

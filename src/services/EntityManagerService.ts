import { EntityManager } from 'typeorm';
import { AppDataSource } from '../config/data-source';

export class EntityManagerService {
  error: any;
  connection: EntityManager = new EntityManager(AppDataSource);
}

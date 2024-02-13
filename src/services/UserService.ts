import { User } from '../entities/User';
import { EntityManagerService } from './EntityManagerService';

export class UserService extends EntityManagerService {
  constructor() {
    super();
  }

  users: User[];
  user: User;

  async getUsers() {
    try {
      const users = await this.connection.find(User, {
        select: { id: true, name: true, age: true, location: true },
      });

      this.users = users;
    } catch (err) {
      this.error = err;
    }

    return this;
  }

  async getUserByField(field: string, query: any) {
    try {
      const user = await this.connection.findOne(User, {
        where: { [field]: query },
        select: { id: true, name: true, age: true, location: true },
      });

      this.user = user;

      if (this.user === null) {
        this.error = { statusCode: 404, message: 'User not found' };
      }
    } catch (err) {
      this.error = err;
    }

    return this;
  }

  async saveUser(user: any) {
    const userEntity = new User();

    Object.assign(userEntity, user);

    const validations = await this.validate(userEntity);

    if (validations.length) {
      this.error = { validations, statusCode: 400 };
      return this;
    }

    this.user = user;

    try {
      const [user] = await this.connection.save([userEntity]);
      this.user = user;
    } catch (err) {
      this.error = err;
    }

    return this;
  }

  private async validate(user: User) {
    const validations = [];

    // Validate types (manually since there are only 3 fields)
    if (user.name) {
      !(typeof user.name === 'string') &&
        validations.push('name must be a string');
    } else {
      validations.push('name must not be empty');
    }

    if (user.age) {
      !(typeof user.age === 'number') &&
        validations.push('age must be a number');
    } else {
      validations.push('age must not be empty');
    }

    if (user.location) {
      !(typeof user.location === 'string') &&
        validations.push('location must be a string');
    } else {
      validations.push('location must not be empty');
    }

    return validations;
  }
}

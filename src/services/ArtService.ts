import { Art } from '../entities/Art';
import { Comment } from '../entities/Comment';
import { EntityManagerService } from './EntityManagerService';

export class ArtService extends EntityManagerService {
  constructor() {
    super();
  }

  arts: Art[];
  art: Art;

  async getArts() {
    try {
      const arts = await this.connection
        .getRepository(Art)
        .createQueryBuilder('art')
        .leftJoinAndMapMany(
          'art.comments',
          Comment,
          'comment',
          'comment.artId = art.id',
        )
        .orderBy('art.id', 'ASC')
        .getMany();

      this.arts = arts;
    } catch (err) {
      this.error = err;
    }

    return this;
  }

  async getArtById(id) {
    try {
      const art = await this.connection
        .getRepository(Art)
        .createQueryBuilder('art')
        .leftJoinAndMapMany(
          'art.comments',
          Comment,
          'comment',
          'comment.artId = art.id',
        )
        .where('art.id = :id', { id: id })
        .getOne();

      this.art = art;

      if (this.art === null) {
        this.error = { statusCode: 404, message: 'Art not found' };
      }
    } catch (err) {
      this.error = err;
    }

    return this;
  }
}

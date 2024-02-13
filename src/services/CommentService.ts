import { Comment } from '../entities/Comment';
import { UserService } from './UserService';
import { EntityManagerService } from './EntityManagerService';
import { IsNull } from 'typeorm';
import { ArtService } from './ArtService';

export class CommentService extends EntityManagerService {
  constructor() {
    super();
  }

  comment: Comment;

  async saveComment(comment: any) {
    const commentEntity = new Comment();

    Object.assign(commentEntity, comment);

    const validations = await this.validate(commentEntity);

    if (validations.length) {
      this.error = { ...this.error, validations, statusCode: 400 };
      return this;
    }

    this.comment = comment;

    try {
      const [comment] = await this.connection.save([commentEntity]);
      this.comment = comment;
    } catch (err) {
      this.error = err;
    }

    return this;
  }

  private async validate(comment: Comment) {
    const validations = [];

    // Validate artId
    const { error } = await new ArtService().getArtById(comment.artId);

    if (error) {
      this.error = error;
      this.error.message = 'artId not found';
      validations.push('Invalid "artId"');
      return validations;
    }

    // Validate userID/name constraints
    if (!comment.userID) {
      const [comments, count] = await this.connection.findAndCount(Comment, {
        where: { userID: IsNull(), name: comment.name, artId: comment.artId },
      });

      count > 0 &&
        validations.push(
          `Unregistered user "${comment.name}" can only leave one comment per art entry`,
        );
    } else {
      const { user, error } = await new UserService().getUserByField(
        'id',
        comment.userID,
      );

      if (error) {
        this.error = error;
      }

      !user && validations.push('userID not found');

      comment.name = user.name;
    }

    // Validate types (manually since there are only 3 fields)
    if (comment.userID) {
      !(typeof comment.userID === 'string') &&
        validations.push('userID must be a string');
    }

    if (comment.name) {
      !(typeof comment.name === 'string') &&
        validations.push('name must be a string');
    }

    if (comment.content) {
      !(typeof comment.content === 'string') &&
        validations.push('content must be a string');
    } else {
      validations.push('content must not be empty');
    }

    return validations;
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Art } from './Art';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  userID: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  content: string;

  @Column({ name: 'art_id' })
  artId: number;

  @ManyToOne(() => Art, (art) => art.comments, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'id',
  })
  art: Art;
}

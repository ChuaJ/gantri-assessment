import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from './Comment';

@Entity({ name: 'art' })
export class Art {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ nullable: true })
  year: number;

  @OneToMany(() => Comment, (comment) => comment.art)
  comments: Comment[];
}

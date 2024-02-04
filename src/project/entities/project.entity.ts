import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  title: string;

  @Column({
    type: 'text',
    name: 'long_description',
  })
  longDescription: string;

  @Column({
    length: 255,
    nullable: true,
    name: 'short_description',
  })
  shortDescription: string;

  @Column({
    length: 255,
    nullable: true,
    name: 'github_link',
  })
  githubLink: string;

  @Column({
    length: 255,
    nullable: true,
    name: 'project_live_url',
  })
  projectLiveUrl: string;

  @Column({
    nullable: true,
    length: 50,
    name: 'image_path',
  })
  imagePath: string;
}

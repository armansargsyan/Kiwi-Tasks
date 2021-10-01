import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class ToDo extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  UserId: number;

  @Column()
  Date: Date;

  @Column()
  Dateline: Date;

  @Column()
  Task: string;

  @Column()
  Priority: string;

  @Column({ default: false })
  Status: boolean;
}

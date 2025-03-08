import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

/**
 * Task entity for database.
 * Defines the task table schema and relationships.
 */
@Entity('tasks') // Database table name is 'tasks'
export class Task {
  @PrimaryGeneratedColumn()
  id!: number; // Auto-generated primary key

  @Column({ type: 'varchar', length: 100 })
  title!: string; // Title of the task, max length 100 characters

  @Column({ type: 'text', nullable: true })
  description?: string; // Description of the task, nullable

  @Column({
    type: 'varchar',
    length: 20,
    default: 'To Do',
    enum: ['To Do', 'In Progress', 'Completed'], // Status options
  })
  status!: 'To Do' | 'In Progress' | 'Completed'; // Status of the task, defaults to 'To Do'

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user!: User; // Many-to-one relationship with User entity, each task belongs to a user
}

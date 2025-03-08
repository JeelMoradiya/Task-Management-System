import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from './Task';

/**
 * User entity for database.
 * Defines the user table schema and relationships.
 */
@Entity('users') // Database table name is 'users'
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Auto-generated primary key

  @Column({ type: 'varchar', length: 50, unique: true })
  username!: string; // User's username, must be unique

  @Column({ type: 'varchar', length: 255 })
  password!: string; // Hashed password

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks!: Task[]; // One-to-many relationship with Task entity, tasks array for user
}

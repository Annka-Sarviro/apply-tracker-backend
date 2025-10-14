import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity({ name: "Projects" })
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", nullable: true })
  technologies?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", nullable: true })
  link?: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user?: User;
}

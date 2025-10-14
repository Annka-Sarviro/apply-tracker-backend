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

@Entity({ name: "CoverLetters" })
export class CoverLetter {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "text" })
  text: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => User, (user) => user.coverLetters, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;
}

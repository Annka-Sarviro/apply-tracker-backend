import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity({ name: "Resume" })
export class Resume {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ description: "Resume name" })
  @Column({ type: "varchar" })
  name: string;

  @ApiProperty({ description: "Resume link/URL" })
  @Column({ type: "varchar" })
  link: string;

  @ManyToOne(() => User, (user) => user.resumes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user?: User;

  @Column({ type: "uuid" })
  userId: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}

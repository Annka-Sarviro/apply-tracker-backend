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

@Entity({ name: "Note" })
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ description: "Note name" })
  @Column({ type: "varchar" })
  name: string;

  @ApiProperty({ description: "Note text content" })
  @Column({ type: "text", nullable: true })
  text?: string;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user?: User;

  @Column({ type: "uuid", nullable: true })
  userId?: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}

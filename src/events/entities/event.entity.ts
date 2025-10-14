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

@Entity({ name: "Event" })
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ description: "Event name" })
  @Column({ type: "varchar" })
  name: string;

  @ApiProperty({ description: "Event text content" })
  @Column({ type: "text", nullable: true })
  text?: string;

  @ApiProperty({ description: "Event date" })
  @Column({ type: "date" })
  date: Date;

  @ApiProperty({ description: "Event time" })
  @Column({ type: "time" })
  time: string;

  @ManyToOne(() => User, (user) => user.events, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user?: User;

  @Column({ type: "uuid", nullable: true })
  userId?: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}

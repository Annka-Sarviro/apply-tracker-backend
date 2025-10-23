import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";

@Entity({ name: "supports" })
export class Support {
  @ApiProperty({ description: "Unique identifier" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ description: "Support request title or name" })
  @Column({ type: "varchar", length: 255 })
  name: string;

  @ApiProperty({
    description: "Email of the user at the time of creating the request",
  })
  @Column({ type: "varchar", length: 255 })
  email: string;

  @ApiProperty({ description: "Support message text" })
  @Column({ type: "text", nullable: true })
  text?: string;

  @ApiProperty({
    description: "ID of the user who created the support request",
  })
  @Column({ type: "uuid", nullable: false })
  userId: string;

  @ApiProperty({
    description: "User who created the support request",
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.supports, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @ApiProperty({ description: "Date of creation" })
  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ApiProperty({ description: "Date of last update" })
  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}

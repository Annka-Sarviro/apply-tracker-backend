import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { Vacancy } from "../../vacancies/entities/vacancy.entity";
import { Resume } from "../../resume/entities/resume.entity";
import { CoverLetter } from "../../cover-letter/entities/cover-letter.entity";
import { Project } from "../../projects/entities/project.entity";
import { Note } from "../../notes/entities/note.entity";
import { Event } from "../../events/entities/event.entity";
import { Prediction } from "../../predictions/entities/prediction.entity";

@Entity({ name: "User" })
export class User {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @ApiProperty({ description: "User`s username" })
  @Column({ type: "varchar", nullable: true })
  username?: string;

  @ApiProperty({ description: "User`s email" })
  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  phone?: string;

  @ApiProperty({ description: "User`s social media links" })
  @Column({ type: "json", nullable: true })
  socials?: Array<{ id: string; name: string; link: string }>;

  @Column({ type: "varchar", nullable: true })
  password?: string;

  @ApiProperty({ description: "User`s reset token" })
  @Column({ type: "varchar", nullable: true })
  resetToken?: string;

  @ApiProperty({ description: "User`s reset token expiry" })
  @Column({ type: "timestamp with time zone", nullable: true })
  resetTokenExpiry?: Date;

  @ApiProperty({ description: "User`s invalidated tokens" })
  @Column("simple-array", { nullable: true })
  invalidatedTokens?: string[];

  @ApiProperty({ description: "User`s google id" })
  @Column({ type: "varchar", nullable: true })
  googleId?: string;

  @ApiProperty({ type: () => [Vacancy], description: "User vacancies" })
  @OneToMany(() => Vacancy, (vacancy) => vacancy.user, { cascade: true })
  vacancies?: Vacancy[];

  @OneToMany(() => Resume, (resume) => resume.user, { cascade: true })
  resumes?: Resume[];

  @OneToMany(() => CoverLetter, (coverLetter) => coverLetter.user, {
    cascade: true,
  })
  coverLetters?: CoverLetter[];

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects?: Project[];

  @ApiProperty({ type: () => [Note], description: "User notes" })
  @OneToMany(() => Note, (note) => note.user, { cascade: true })
  notes?: Note[];

  @ApiProperty({ type: () => [Event], description: "User events" })
  @OneToMany(() => Event, (event) => event.user, { cascade: true })
  events?: Event[];

  @OneToMany(() => Prediction, (prediction) => prediction.user, {
    cascade: true,
  })
  predictions?: Prediction[];

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;
}

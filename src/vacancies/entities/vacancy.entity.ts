import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { VacancyStatus } from "../../vacancy-status/entities/vacancy-status.entity";

export enum WorkType {
  REMOTE = "remote",
  OFFICE = "office",
  HYBRID = "hybrid",
}

@Entity({ name: "Vacancies" })
export class Vacancy {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  vacancy: string;

  @Column({ type: "varchar" })
  link: string;

  @Column({ type: "varchar", nullable: true })
  communication?: string;

  @Column({ type: "varchar" })
  company: string;

  @Column({ type: "varchar" })
  location: string;

  @Column({ type: "enum", enum: WorkType })
  work_type: WorkType;

  @Column({ type: "text", nullable: true })
  note?: string;

  @Column({ type: "boolean", default: false })
  isArchived: boolean;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => VacancyStatus, (status) => status.vacancy)
  statuses: VacancyStatus[];

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";

import { User } from "../users/user.entity";
import { IAvailability } from "./availability.dto";
@Entity("Availability")
export class Availability {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "staffId" })
  staffId: User;

  @Column({ type: "timestamp", nullable: false })
  date: Date;

  @Column({ type: "boolean", nullable: false })
  isAvailable: boolean;

  @Column({ type: "timestamp", nullable: false })
  startTime: Date;

  @Column({ type: "timestamp", nullable: false })
  endTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

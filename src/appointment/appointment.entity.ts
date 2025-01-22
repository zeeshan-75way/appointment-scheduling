import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from "typeorm";
import { User } from "../users/user.entity";
import { Service } from "../service/service.entity";
import { Availability } from "../availability/availability.entity";

@Entity("Appointment")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  userId: User;

  @ManyToOne(() => Service)
  @JoinColumn({ name: "serviceId" })
  serviceId: User;

  @OneToOne(() => Availability)
  @JoinColumn({ name: "availabilityId" })
  availabilityId: User;

  @Column({
    type: "enum",
    enum: ["BOOKED", "CANCELLED", "RESCHEDULED"],
    default: "BOOKED",
  })
  status: "BOOKED" | "CANCELLED" | "RESCHEDULED";

  @Column({ type: "timestamp", nullable: false })
  startTime: Date;

  @Column({ type: "timestamp", nullable: false })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

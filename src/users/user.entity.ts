import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcrypt";
import { AppDataSource } from "../common/services/postgres-database.service";
@Entity("User") // Table name in the database
export class User {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: true }) // `select: false` to omit by default
  password?: string;

  @Column({
    type: "enum",
    enum: ["USER", "ADMIN", "STAFF"],
    default: "USER",
  })
  role: "USER" | "ADMIN" | "STAFF";

  @Column({ type: "varchar", length: 255, nullable: true })
  position?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  department?: string;

  @Column({ type: "varchar", nullable: true })
  refreshToken?: string | null;

  @Column({ type: "varchar", nullable: true })
  forgotPasswordToken?: string;

  @Column({ type: "timestamp", nullable: true })
  forgotPasswordTokenExpiry?: Date | "" | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPasswordOnInsert() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
  @BeforeUpdate()
  async hashPasswordOnUpdate() {
    if (this.password) {
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({
        where: { _id: this._id },
        select: ["password"],
      });

      if (existingUser && existingUser.password !== this.password) {
        this.password = await bcrypt.hash(this.password, 12);
      }
    }
  }
}

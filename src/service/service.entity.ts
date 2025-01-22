import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("Service")
export class Service {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  description: string;

  @Column({ type: "float", nullable: false })
  price: number;
}

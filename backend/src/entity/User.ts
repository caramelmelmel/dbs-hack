import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  birthday: Date;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  city: string;

  @Column()
  country: string;
}

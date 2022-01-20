import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  User_ID: number;

  @Column()
  Name: string;

  @Column()
  age: number;

  @Column()
  Birthday: Date;

  @Column()
  Email: string;

  @Column()
  Phone: number;

  @Column()
  City: string;

  @Column()
  Country: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('city')
export class City {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  state: string
}
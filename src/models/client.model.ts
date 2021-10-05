import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "./city.model";


@Entity('client')
export class Client {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string

  @Column('date', { name: "birth_date" })
  birth_date: Date;

  @Column()
  age: number;

  @ManyToOne(() => City, city => city.id)
  @JoinColumn({ name: 'city_id' })
  city: City;

}
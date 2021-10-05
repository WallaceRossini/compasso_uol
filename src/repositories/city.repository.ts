import { EntityRepository, Repository } from "typeorm";
import { City } from "../models/city.model";

@EntityRepository(City)
export class CityRepository extends Repository<City> {

}
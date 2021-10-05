import { EntityRepository, Repository } from "typeorm";
import { Client } from "../models/client.model";

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {

}
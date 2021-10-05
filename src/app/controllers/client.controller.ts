import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import { CreateClientDto, UpdateClientDto } from "../../dto/client.dto";
import { ClientGender } from "../../enum";
import { AppError } from "../../errors/app_error.error";
import { CityRepository } from "../../repositories/city.repository";
import { ClientRepository } from "../../repositories/client.repository";

export class ClientController {

  public async index(
    request: Request, response: Response
  ) {

    const { id } = request.query;

    const schema = yup.object().shape({
      id: yup.number().required(),
    });

    try {
      await schema.validate(request.query, { abortEarly: false });
    } catch (err) {
      throw new AppError(String(err));
    }

    const client_repository = getCustomRepository(ClientRepository);

    const client = await client_repository.findOne({
      where: { id },
      join: {
        alias: 'client',
        leftJoinAndSelect: {
          city: 'client.city'
        }
      }
    })

    if (!client)
      throw new AppError("Client was not found.")

    return response.status(200).json(client)

  }


  public async show(
    request: Request, response: Response
  ) {

    const { name } = request.query

    const schema = yup.object().shape({
      name: yup.string().required(),
    });

    try {
      await schema.validate(request.query, { abortEarly: false });
    } catch (err) {
      throw new AppError(String(err));
    }

    const client_repository = getCustomRepository(ClientRepository);

    const client = await client_repository.findOne({
      where: { name },
      join: {
        alias: 'client',
        leftJoinAndSelect: {
          city: 'client.city'
        }
      }
    })

    if (!client)
      throw new AppError("Client was not found.")

    return response.status(200).json(client)

  }

  public async create(
    request: Request, response: Response
  ) {

    const { name, gender, birth_date, city }: CreateClientDto = request.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      gender: yup.mixed().oneOf(Object.values(ClientGender)).required(),
      birth_date: yup.string().required(),
      city: yup.number().required()
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(String(err));
    }

    const client_repository = getCustomRepository(ClientRepository);
    const city_repository = getCustomRepository(CityRepository);

    const exist_city = await city_repository.findOne({ where: { id: city } })

    if (!exist_city)
      throw new AppError("City was not found.")

    let birth = new Date(birth_date).getTime();
    let now = new Date().getTime();

    let age = Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 365.25));

    const client = client_repository.create({
      name,
      gender,
      birth_date,
      age,
      city: exist_city
    })

    await client_repository.save(client)

    return response.status(201).json(client)
  }

  public async update(
    request: Request, response: Response
  ) {

    const { id } = request.params
    const clientDto: UpdateClientDto = request.body
    const client_repository = getCustomRepository(ClientRepository);
    const city_repository = getCustomRepository(CityRepository);

    const schema = yup.object().shape({
      name: yup.string().notRequired(),
      gender: yup.mixed().oneOf(Object.values(ClientGender)).notRequired(),
      birth_date: yup.string().notRequired(),
      city: yup.number().notRequired()
    });

    const schema_params = yup.object().shape({
      id: yup.number().required()
    })

    try {
      await schema.validate(request.body, { abortEarly: false });
      await schema_params.validate(request.params, { abortEarly: false });
    } catch (err) {
      throw new AppError(String(err));
    }

    let exist_client = await client_repository.findOne({ where: { id } })

    if (!exist_client)
      throw new AppError("Client was not found.")

    if (clientDto.birth_date) {
      let birth = new Date(clientDto.birth_date).getTime();
      let now = new Date().getTime();

      clientDto.age = Math.floor((now - birth) / (1000 * 60 * 60 * 24 * 365.25));
    }

    if (clientDto.city_id) {
      var exist_city = await city_repository.findOne({ where: { id: clientDto.city_id } })

      if (!exist_city)
        throw new AppError("City was not found.")

      clientDto.city = exist_city
    }

    const client = await client_repository.save({
      id: exist_client.id,
      ...clientDto
    })

    return response.status(201).json(client)
  }

  public async delete(
    request: Request, response: Response
  ) {

    const { id } = request.params

    const schema = yup.object().shape({
      id: yup.number().required()
    });

    try {
      await schema.validate(request.params, { abortEarly: false });
    } catch (err) {
      throw new AppError(String(err));
    }

    const client_repository = getCustomRepository(ClientRepository);

    const exist_client = await client_repository.findOne({ where: { id } })

    if (!exist_client)
      throw new AppError("Client was not found.")

    const client = await client_repository.remove(exist_client)

    return response.status(200).json(client)

  }
}
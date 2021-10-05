import { Request, Response } from "express";
import { getCustomRepository, Like } from "typeorm";
import { CreateCityDto } from "../../dto/city.dto";
import { AppError } from "../../errors/app_error.error";
import { CityRepository } from "../../repositories/city.repository";
import * as yup from 'yup';
import { CityState } from "../../enum/city.enum";

export class CityController {

  public async index(
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


    const cityRepository = getCustomRepository(CityRepository);

    if (!name)
      throw new AppError("Query name is required")

    const cities = await cityRepository.find({ where: { name: Like(`%${name}%`) } })

    return response.status(200).json(cities)

  }

  public async show(
    request: Request, response: Response
  ) {

    const { state } = request.query

    const schema = yup.object().shape({
      state: yup.mixed().oneOf<CityState>(Object.values(CityState)).required(),
    });

    try {
      await schema.validate(request.query, { abortEarly: false });
    } catch (err) {
      throw new AppError(String(err));
    }

    const cityRepository = getCustomRepository(CityRepository);

    if (!state)
      throw new AppError("Query state is required")

    const cities = await cityRepository.find({ where: { state } })

    return response.status(200).json(cities)

  }

  public async create(
    request: Request, response: Response
  ) {

    const { name, state }: CreateCityDto = request.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      state: yup.mixed().oneOf<CityState>(Object.values(CityState)).required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(String(err));
    }

    const cityRepository = getCustomRepository(CityRepository);

    const city = await cityRepository.create({
      name,
      state
    })

    await cityRepository.save(city);

    return response.status(201).json(city)

  }

}
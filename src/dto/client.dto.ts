import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ClientGender } from "../enum";
import { City } from "../models/city.model";

export class CreateClientDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ClientGender)
  @IsNotEmpty()
  gender: ClientGender

  @IsString()
  @IsNotEmpty()
  birth_date: string;

  @IsNumber()
  @IsNotEmpty()
  city: number;
}

export class UpdateClientDto {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(ClientGender)
  gender: ClientGender

  @IsOptional()
  @IsString()
  birth_date: string;

  @IsOptional()
  @IsNumber()
  city: City;

  @IsOptional()
  @IsNumber()
  city_id: number

  @IsOptional()
  @IsNumber()
  age?: number;
}
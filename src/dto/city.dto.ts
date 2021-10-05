import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CityState } from "../enum/city.enum";


export class CreateCityDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CityState)
  @IsNotEmpty()
  state: CityState
}
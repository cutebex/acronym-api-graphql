import { IsString } from 'class-validator';

export class CreateDataDto {
  @IsString()
  public acronym: string;

  @IsString()
  public definition: string;
}

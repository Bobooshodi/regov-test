import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

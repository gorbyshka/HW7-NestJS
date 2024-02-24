import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength
} from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEmail()
    email: string;

}

export class SignInUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}

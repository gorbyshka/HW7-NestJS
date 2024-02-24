import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import {
    CreateUserDto,
    SignInUserDto
} from '../dto/auth.dto';

import {
    createUserSchema,
    signInUserSchema
} from '../schema/validation.schema';

@Controller('users')
export class AuthController {

    constructor(private readonly usersService: AuthService) { }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto, @Res() res) {

        try {

            const { error } = createUserSchema.validate(createUserDto);

            if (error) { throw new Error(error.message) }

            await this.usersService.createUser(createUserDto);
            return res.status(HttpStatus.CREATED).send('User has been created successfully');

        } catch (error) { return res.status(HttpStatus.BAD_REQUEST).send(error.message) }
    }

    @Post('signin')
    async signIn(@Body() signInUserDto: SignInUserDto, @Res() res) {

        try {

            const { error } = signInUserSchema.validate(signInUserDto);

            if (error) { throw new Error(error.message) }

            await this.usersService.authenticateUser(signInUserDto);

            return res.status(HttpStatus.OK).send('User has been authenticated successfully');

        } catch (error) { return res.status(HttpStatus.UNAUTHORIZED).send(error.message) }

    }

}

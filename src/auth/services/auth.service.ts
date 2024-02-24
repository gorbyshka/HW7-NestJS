import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {
    CreateUserDto,
    SignInUserDto
} from '../dto/auth.dto';

import {
    createUserSchema,
    signInUserSchema
} from '../schema/validation.schema';

@Injectable()
export class AuthService {

    private users: any[] = [];

    async createUser(createUserDto: CreateUserDto): Promise<void> {

        const { error } = createUserSchema.validate(createUserDto);

        if (error) throw new Error(error.message);

        const { username, password, email } = createUserDto;

        const existingUser = this.users.find(user => user.username === username);

        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        this.users.push({ username, password: hashedPassword, email });

    }

    async authenticateUser(signInUserDto: SignInUserDto): Promise<void> {

        const { error } = signInUserSchema.validate(signInUserDto);

        if (error) throw new Error(error.message);

        const { username, password } = signInUserDto;

        const user = this.users.find(user => user.username === username);

        if (!user) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) throw new Error('Invalid password');

    }

}

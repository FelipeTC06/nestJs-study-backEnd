import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt'
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users: User[] = [];

    async getAllUser(): Promise<User[]> {
        return this.users;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;

        const passwordHashed = await hash(createUserDto.password, saltOrRounds);
        
        const user: User = {
            ...createUserDto,
            id: this.users.length + 1,
            password:passwordHashed
        }

        this.users.push(user);

        return user;
    }

}

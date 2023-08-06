import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserEntity } from './interfaces/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UsePipes(ValidationPipe)
    @Get()
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUser()).map((UserEntity) => new ReturnUserDto(UserEntity));
    }

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

}

import { UserEntity } from './interfaces/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { hash } from 'bcrypt'
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
) {}

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getUserById(userId: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        if(!user) {
            throw new NotFoundException(`UserId: ${userId} Not Found`)
        }

        return user;

    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;

        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password:passwordHashed,
        })
    }

}

import { CityService } from './../city/city.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entity/address.entity';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        private readonly userService: UserService,
        private readonly cityService: CityService,
    ) {}

    async createAddress(createAddressDto: CreateAddressDto, userId: number) {
        await this.userService.getUserById(userId);
        await this.cityService.getCityById(createAddressDto.cityId)
        return this.addressRepository.save({
            ...createAddressDto,
            userId,
        });

    }

}

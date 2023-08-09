import { CacheService } from './../cache/cache.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entity/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        private readonly cahceService: CacheService,
    ) { }

    async getAllCitiesByState(stateId: number): Promise<CityEntity[]> {
        return this.cahceService.getCache<CityEntity[]>(`${stateId}`, () =>
            this.cityRepository.find({
                where: {
                    stateId,
                }
            })
        )
    }

    async getCityById(cityId: number): Promise<CityEntity> {
        const city = await this.cityRepository.findOne({
            where: {
                id: cityId,
            },
        });

        if(!city) {
            throw new NotFoundException(`CityId: ${cityId} Not Found`);
        }

        return city;

    }

}

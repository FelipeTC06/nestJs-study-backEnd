import { CacheService } from './../cache/cache.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
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
}

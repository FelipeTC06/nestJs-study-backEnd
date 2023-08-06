import { CityService } from './city.service';
import { Controller, Get, Param } from '@nestjs/common';
import { CityEntity } from './entity/city.entity';

@Controller('city')
export class CityController {

    constructor(
        private readonly cityService: CityService,
    ) {}


    @Get('/:stateId')
    async getCitiesByState(@Param('stateId') stateId: number): Promise<CityEntity[]>{
        return this.cityService.getAllCitiesByState(stateId);
    }
}

import { Controller, Post, Body, ValidationPipe, UseInterceptors, Get, Param } from '@nestjs/common';
import { BaggageService } from './baggage.service';
import { Baggage } from './baggage.entity';
import { CreateBaggageDto } from './dto/create_baggage.dto';
import { ErrorInterceptor } from 'src/interceptors/error.interceptor';

@Controller('baggage')
export class BaggageController {
    constructor(private readonly baggageService: BaggageService) {}

    @UseInterceptors(ErrorInterceptor)
    @Get(':id/status')
    async getBaggageStatus(@Param('id') id: number) {
        const baggageStatus = await this.baggageService.getBaggage(id);
        return { status: baggageStatus };
    }

    @UseInterceptors(ErrorInterceptor)
    @Get(':id/origin-destination')
    async getBaggageOriginAndDestination(@Param('id') id: number) {
        const baggageOriginAndDestination = await this.baggageService.getOriginAndDestination(id);
        return baggageOriginAndDestination;
    }

    @UseInterceptors(ErrorInterceptor)
    @Post()
    async createBaggage(@Body(new ValidationPipe()) createBaggageDto: CreateBaggageDto): Promise<Baggage> {
        const newBaggage = await this.baggageService.createBaggage(createBaggageDto);
        return newBaggage;
    }
}

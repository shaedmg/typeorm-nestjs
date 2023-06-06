import { Controller, Post, Body, ValidationPipe, UseInterceptors, Get, Param, Patch } from '@nestjs/common';
import { BaggageService } from './baggage.service';
import { Baggage } from './baggage.entity';
import { CreateBaggageDto } from './dto/CreateBaggage.dto';
import { ErrorInterceptor } from 'src/interceptors/error.interceptor';
import { UpdateBaggageDto } from './dto/UpdateBaggage.dto';

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

    @UseInterceptors(ErrorInterceptor)
    @Patch(':id/status')
    async updateBaggage(
        @Param('id') id: number,
        @Body(new ValidationPipe()) updateBaggageDto: UpdateBaggageDto,
    ): Promise<Baggage> {
        const newBaggage = await this.baggageService.updateBaggageStatus(id, updateBaggageDto);
        return newBaggage;
    }
}

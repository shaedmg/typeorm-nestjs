import { Controller, Post, Body, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { BaggageService } from './baggage.service';
import { Baggage } from './baggage.entity';
import { CreateBaggageDto } from './dto/create_baggage.dto';
import { ErrorInterceptor } from 'src/interceptors/error.interceptor';

@Controller('baggage')
export class BaggageController {
    constructor(private readonly baggageService: BaggageService) {}

    @UseInterceptors(ErrorInterceptor)
    @Post()
    async createBaggage(@Body(new ValidationPipe()) createBaggageDto: CreateBaggageDto): Promise<Baggage> {
        const newBaggage = await this.baggageService.createBaggage(createBaggageDto);
        return newBaggage;
    }
}

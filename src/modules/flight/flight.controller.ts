import { Controller, Post, Body, ValidationPipe, UseInterceptors, Get, Param, Patch } from '@nestjs/common';
import { ErrorInterceptor } from 'src/interceptors/error.interceptor';
import { CreateFlightDto } from './dto/CreateFlight.dto';
import { Flight } from './flight.entity';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
    constructor(private readonly flightService: FlightService) {}

    @UseInterceptors(ErrorInterceptor)
    @Get(':id/total-weight')
    async getBaggageStatus(@Param('id') id: number) {
        const flightWeight = await this.flightService.getFlightWeight(id);
        return { weight: flightWeight };
    }

    @UseInterceptors(ErrorInterceptor)
    @Post()
    async createFlight(@Body() createFlightDto: CreateFlightDto): Promise<Flight> {
        const newflight = await this.flightService.createFlight(createFlightDto);
        return newflight;
    }
}

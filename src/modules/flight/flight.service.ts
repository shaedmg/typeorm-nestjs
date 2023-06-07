import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flight.entity';

@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>,
    ) {}

    async createFlight(createFlightDto: any): Promise<Flight> {
        const newFlight = this.flightRepository.create(createFlightDto as Flight);
        console.log({ newFlight });
        return this.flightRepository.save(createFlightDto);
    }

    async getFlightWeight(id: number): Promise<number> {
        const flight = await this.flightRepository.findOne({ where: { id }, relations: ['baggages'] });
        console.log(flight);
        if (!flight) {
            throw new NotFoundException('Flight not found');
        }
        const totalWeight = flight.baggages.reduce((acc, baggage) => acc + baggage.weight, 0);
        return totalWeight;
    }
}

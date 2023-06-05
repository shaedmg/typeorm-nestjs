import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Baggage } from './baggage.entity';
import { CreateBaggageDto } from './dto/create_baggage.dto';

@Injectable()
export class BaggageService {
    constructor(
        @InjectRepository(Baggage)
        private readonly baggageRepository: Repository<Baggage>,
    ) {}

    async createBaggage(createBaggageDto: CreateBaggageDto): Promise<Baggage> {
        const newBaggage = this.baggageRepository.create(createBaggageDto);
        return this.baggageRepository.save(newBaggage);
    }
}

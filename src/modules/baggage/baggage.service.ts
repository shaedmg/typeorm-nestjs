import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Baggage } from './baggage.entity';
import { CreateBaggageDto } from './dto/create_baggage.dto';
import { DatabaseHelper } from 'src/infra/database/database.helper';
import { BaggageStatus } from './baggage.enum';

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

    async getBaggage(id: number): Promise<BaggageStatus> {
        const baggage = await this.baggageRepository.findOne(DatabaseHelper.getDbQuery({ id, _show: ['status'] }));
        return baggage.status;
    }

    async getOriginAndDestination(id: number): Promise<{ origin: string; destination: string }> {
        const baggage = await this.baggageRepository.findOne(
            DatabaseHelper.getDbQuery({ id, _show: ['origin', 'destination'] }),
        );
        if (!baggage) {
            throw new NotFoundException('Baggage not found');
        }
        return { origin: baggage.origin, destination: baggage.destination };
    }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Baggage } from './baggage.entity';
import { BaggageService } from './baggage.service';
import { BaggageController } from './baggage.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Baggage])],
    providers: [BaggageService],
    controllers: [BaggageController],
})
export class BaggageModule {}

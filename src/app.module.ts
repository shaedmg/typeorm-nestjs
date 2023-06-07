import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './infra/database/database.config';
import { ConfigModule } from '@nestjs/config';
import { BaggageModule } from './modules/baggage/baggage.module';
import { Baggage } from './modules/baggage/baggage.entity';
import { Flight } from './modules/flight/flight.entity';
import { FlightModule } from './modules/flight/flight.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: () => {
                return { ...getTypeOrmConfig(), entities: [Baggage, Flight] };
            },
        }),
        BaggageModule,
        FlightModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

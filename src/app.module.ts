import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './infra/database/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { BaggageModule } from './modules/baggage/baggage.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: () => getTypeOrmConfig(),
        }),
        BaggageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

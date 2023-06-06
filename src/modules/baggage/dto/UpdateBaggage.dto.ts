import { IsEnum } from 'class-validator';
import { BaggageStatus } from '../baggage.enum';

export class UpdateBaggageDto {
    @IsEnum(BaggageStatus)
    status: string;
}

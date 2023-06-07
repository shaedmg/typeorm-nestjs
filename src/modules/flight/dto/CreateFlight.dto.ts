import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFlightDto {
    @IsString()
    origin: string;

    @IsNumber()
    destination: string;

    @IsOptional()
    @IsArray()
    baggages: number[];
}

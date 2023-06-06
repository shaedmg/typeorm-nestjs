import { IsNumber, IsString } from 'class-validator';

export class CreateBaggageDto {
    @IsNumber()
    weight: number;

    @IsString()
    origin: string;

    @IsString()
    destination: string;
}

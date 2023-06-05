import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaggageStatus } from './baggage.enum';
import { IsEnum, IsNumber, IsString, isString, validateSync } from 'class-validator';

@Entity()
export class Baggage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNumber()
    weight: number;

    @Column()
    @IsString()
    origin: string;

    @Column()
    @IsString()
    destination: string;

    @Column({
        type: 'enum',
        enum: BaggageStatus,
        default: BaggageStatus.PENDING,
    })
    @IsEnum(BaggageStatus)
    status: BaggageStatus = BaggageStatus.PENDING;

    @BeforeInsert()
    @BeforeUpdate()
    validate() {
        const errors = validateSync(this);
        if (errors.length > 0) {
            const messages = errors.map(error => Object.values(error.constraints)).join(', ');
            throw new Error(messages);
        }
    }
}

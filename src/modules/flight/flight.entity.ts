import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, ManyToMany, JoinTable } from 'typeorm';
import { IsString, validateSync } from 'class-validator';
import { Baggage } from '../baggage/baggage.entity';

@Entity()
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    origin: string;

    @Column()
    @IsString()
    destination: string;

    @Column()
    @ManyToMany(() => Baggage, baggage => baggage.flights)
    @JoinTable()
    baggages: Baggage[];

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

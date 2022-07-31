import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Temp extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

}

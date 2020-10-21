import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Category, category => category.type)
    categories: Category[]
}

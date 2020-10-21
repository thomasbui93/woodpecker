import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Content } from "./Content";
import { Tag } from "./Tag";
import { Type } from "./Type";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Type, type => type.categories)
    type: Type

    @OneToMany(() => Content, content => content.category)
    contents: Content[]
}

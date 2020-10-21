import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @ManyToOne(() => Category, category => category.contents)
    category: Content[]

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[]

    @Column()
    views: number;

    @Column()
    isPublished: boolean;
}

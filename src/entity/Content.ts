import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn} from "typeorm";
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

    @Column()
    views: number;

    @Column()
    isPublished: boolean;
    
    @Column()
    publishedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.contents)
    category: Content[]

    @ManyToMany(() => Tag)
    @JoinTable({
        name: "question_categories"
    })
    tags: Tag[]
}

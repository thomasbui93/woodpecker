import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1603376631115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE types (
                id INT AUTO_INCREMENT PRIMARY KEY,   
                name VARCHAR(100) NOT NULL,       
                description VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await queryRunner.query(`
            CREATE TABLE categories (
                id INT AUTO_INCREMENT PRIMARY KEY,   
                name VARCHAR(100) NOT NULL,       
                description VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                typeId INT,
                CONSTRAINT fk_type FOREIGN KEY (typeId) REFERENCES types(id)
            );
        `)

        await queryRunner.query(`
            CREATE TABLE contents (
                id INT AUTO_INCREMENT PRIMARY KEY,   
                title VARCHAR(100) NOT NULL,       
                text TEXT NOT NULL,
                views INT,
                isPublished BOOLEAN,
                publishedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                categoryId INT,
                CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES categories(id)
            );
        `)

        await queryRunner.query(`
            CREATE TABLE tags (
                id INT AUTO_INCREMENT PRIMARY KEY,   
                name VARCHAR(100) NOT NULL,       
                description VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)

        await queryRunner.query(`
            CREATE TABLE contents_tags (
                id INT AUTO_INCREMENT PRIMARY KEY,   
                tagId VARCHAR(100) NOT NULL,       
                contentId VARCHAR(255) NOT NULL,
                CONSTRAINT fk_tag FOREIGN KEY (tagId) REFERENCES tags(id),
                CONSTRAINT fk_content FOREIGN KEY (contentId) REFERENCES contents(id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS contents;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS types;
        `)
    }

}

import { Entity, Column } from "typeorm";

@Entity()
export class Task {
    @Column({ primary: true, generated: true })
    id!: number;

    @Column({
        length: 100
    })
    title!: string;

    @Column("text", { nullable: true })
    description!: string | null;

    @Column({ default: "pending" })
    status!: "pending" | "finished";
}

@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id!: number

    @Column({ unique: true })
    email!: string

    @Column({ select: false })
    password!: string;
}
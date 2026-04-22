import { Entity, Column, OneToMany, ManyToOne, type Relation } from "typeorm";

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

    @ManyToOne(() => User, (user) => user.tasks)
    user!: Relation<User>
}

@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id!: number

    @Column({ unique: true })
    email!: string

    @Column({ select: false })
    password!: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Relation<Task[]>
}
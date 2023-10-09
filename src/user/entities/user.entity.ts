import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base/base.entity";
@Entity()
export class User extends Base {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true, default:""})
    email: string;

    // @Column()
    // password: string;

}

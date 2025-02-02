import {Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Permission} from "../../permission/permission/permission.entity";

@Entity('roles')
export class Role{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Permission, {cascade: true})
    @JoinTable({
        name: 'role_permission',
        joinColumn: {name: 'role_id', referencedColumnName:'id'},
        inverseJoinColumn: {name: 'permission_id', referencedColumnName:'id'}
    })
    permissions: Permission[];

}
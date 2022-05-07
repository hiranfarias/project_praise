import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ExclusionMetadata } from "typeorm/metadata/ExclusionMetadata";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";

@Entity("users")
class User {

@PrimaryColumn()
readonly id: string;

@Column()
name: string;

@Column()
email: string;

@Column()
admin: boolean;

//https://github.com/typestack/class-transformer
@Exclude()
@Column()
password: string;

@CreateDateColumn()
create_at: Date;

@UpdateDateColumn()
updated_at: Date;

constructor() {
  if(!this.id) {
    this.id = uuid();
  }
}

}

export { User };

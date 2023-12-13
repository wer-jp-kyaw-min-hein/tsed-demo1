import {Property} from "@tsed/schema";
import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from "typeorm";

@Entity( )
export class User {
  static find(): User[] | PromiseLike<User[]> {
    throw new Error("Method not implemented.");
  }
  @Property()
  @PrimaryColumn()
  id: number;

  @Column({ name: "title" })
  title: string;

  @Column({ name: "content" })
  content: string;

  @Column({ name: "content_image" , nullable: true })
  coverImage: string;

  @Column({ name: "created_at" })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ name: "updated_at" })
  @UpdateDateColumn()
  updatedAt: Date;
}
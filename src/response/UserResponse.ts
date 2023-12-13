import { Property, Required, Title } from "@tsed/schema";
import { User } from "src/models/User";
// import { User } from "../entities/User";

export class UserResponse {
  @Property()
  @Required()
  @Title("Id")
  id: number;

  @Property()
  @Required()
  @Title("Title")
  title: string;

  @Property()
  @Required()
  @Title("Content")
  content: string;

  constructor(user: User) {
    this.id = user.id;
    this.title = user.title;
    this.content = user.content;
  }
}

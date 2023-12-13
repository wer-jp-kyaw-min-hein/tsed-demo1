import { Injectable } from "@tsed/di"; // dependency injection
import { Inject } from "@tsed/di"; // dependency injection
import { DataSource } from "typeorm"; // data source used to interact with database
import { User } from "../models/User"; // classes or constants imported for use within UserService
import { POSTGRES_DATA_SOURCE } from "src/datasources/PostgresDatasource"; // classes or constants imported for use within UserService
import { UserResponse } from "src/response/UserResponse"; // classes or constants imported for use within UserService

@Injectable()
export class UserService {
    createUser(user: User) {
      throw new Error("Method not implemented."); // method to create user, currently throwing a Method not implemented error
    }
    constructor(@Inject(POSTGRES_DATA_SOURCE) private dataSource: DataSource) { } // accepts DataSource object, injects it into the UserService

    async getAll(): Promise<User[]> { // Retrieves all users from database using getRepository(User).find()
        return await this.dataSource.getRepository(User).find();
    }

    async create(id: number, title: string, content: string): Promise<void> { // creating a User object provided by id, title, and content, then saving to database.
        let u: User = new User();
        u.id = id;
        u.title = title;
        u.content = content;
        await this.dataSource.getRepository(User).save(u);
    }


    async getById(id: number): Promise<User | null> {
        try {
            // console.log("ih");
          // Fetch the user by ID using your data source
          const user: User | null = await this.dataSource.getTreeRepository(User).findOne({ where: { id } });
      
          return user; // Return the retrieved user or null if not found
        } catch (error) {
          // Handle errors here, log or rethrow as needed
          throw new Error("Failed to fetch user: " + error.message);
        }
      }
      

    async update(id: number, title: string, content: string): Promise<User | undefined> { // Updates user data based on id, title, and content 
        try {
            console.log("Updating user...");
            const userRepository = this.dataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id } });

            if (user) {
                console.log("User found. Updating data...");
                Object.assign(user, id, title, content);
                return await userRepository.save(user);
            }

            console.log("User not found.");
            return undefined;
        } catch (error) {
            console.error("Error occurred during update:", error);
            throw new Error(`Failed to update user: ${error}`);
        }
   }

    async delete(id: number): Promise<any> { //  deletes a user by id from the database.
        return await this.dataSource.getRepository(User).delete(id); // database operation deletes a user from database
    }

}
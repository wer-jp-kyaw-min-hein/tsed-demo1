import { Get, Post, Put, Delete, JsonClassStore, string, any } from "@tsed/schema"; // decorators and utilities for defining schemas, models, and classes in TypeScript
import { UserService } from "src/services/UserService"; // imported from src/services/UserService
import { User } from "src/models/User"; // imported from src/models/User
import { BodyParams, PathParams } from "@tsed/platform-params"; // provides decorators that facilitate the extraction of parameters from the request in a Ts.ED application. Specifically
import { Controller, Inject, Module, MultipartFile, PlatformMulterFile, Req } from "@tsed/common"; //  part of the Ts.ED framework used for various purposes
import { Res } from "@tsed/common"; // to access and manipulate the response object in HTTP requests
import { UserResponse } from "src/response/UserResponse"; // imported from src/response/UserResponse



@Controller("/user") // decorator in a TypeScript file with Ts.ED framework indicates the creation of a controller that handles endpoints related to the "/user" path 
export class UserController { // TypeScript class associated with Ts.ED framework
  constructor(@Inject(UserService) private userService: UserService) { }
  @Get("/") // associated method should handle GET requests to the specified route
  async getUser(@Res() res: Res): Promise<UserResponse[]> {
    try { // try-catch block to handle potential errors
      const users: User[] = await this.userService.getAll()
      const userResponses: UserResponse[] = users.map((user) => new UserResponse(user)); // goes through each user in the users array. For each user, creates new UserResponse object using UserResponse class.
      return userResponses; // new UserResponse objects goes to userResponses
    } catch (err) { // any error occurs within the try block,control pased to the catch block.
      // Handle errors here, for example, log the error or throw it further
      throw new Error("Failed to fetch users: " + err.message); // Okay, now stop what you're doing and deal with this problem!
    } // end of code block
    } // end of code block

  @Post("/") // routing / hadnling HTTP requests
  async createUser(@BodyParams() body: any) { // createUser = a controller or a service class. async = asynchronous and use await to hadle promises, @BodyParams = decorator-based parameter binding , body = variable,  any = can hold any data.
    try {
      const { id, title, content } = body;
      const users: User[] = await this.userService.create(id, title, content);
      // you can declare users in responseuser
      return { id, title, content }; // Return the response or created user information
    } catch (error) {
      // Handle errors appropriately
      return { error: "Failed to create user" };
    }
  }

  @Get("/:id")
  async getOne(@PathParams("id") id: number, @Res() res: Res): Promise<UserResponse | null> {
  try {
    // console.log("Hi");
    const user: User | null = await this.userService.getById(id);
    console.log(await this.userService.getById(id));
    if (!user) {
      res.status(404).send("User not found"); // Respond with a 404 status if the user is not found
      return null;
    }

    const userResponse: UserResponse = new UserResponse(user);
    return userResponse;
  } catch (err) {
    // Handle errors here, for example, log the error or throw it further
    throw new Error("Failed to fetch user: " + err.message);
  }
}
  @Put("/:id") // method handle HTTP PUT
  async putRequest(
    @PathParams("id") id: number, //
    @BodyParams() body: any) { // request entire body
    try {
        // Log the parameters before calling the service method
      console.log("Received ID:", id);
      console.log("Received Body:", body);

      const updatedUser = this.userService.update(id, body);
      
      if (updatedUser !== null) {
        console.log("Updated User:", updatedUser);
        return { message: "Updated Successfully" };
      } else {
        return { error: "User not found" };
      }
    } catch (error) {
      console.error("Error occurred during update:", error);
      return { error: "Failed to update user. Check server logs for details." };
  }
}

  @Delete("/:id") // HTTP DELETE REQUEST
  delete(@PathParams("id") id: number): Promise<User> {
    return this.userService.delete(id);
  }
}


// function UploadedFile(arg0: string): (target: UserController, propertyKey: "createUser", parameterIndex: 1) => void {
//   throw new Error("Function not implemented.");
// }
// function UploadedFile(arg0: string): (target: UserController, propertyKey: "createUser", parameterIndex: 1) => void {
//   throw new Error("Function not implemented.");
// }


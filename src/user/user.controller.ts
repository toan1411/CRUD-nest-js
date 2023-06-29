
import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./create-user.dto";
import { ApiCreatedResponse } from "@nestjs/swagger";


@Controller('/user')
export class UserController {
   constructor(private readonly userService: UserService){}

   @Post()
   @ApiCreatedResponse()
   async createUser( @Body() input : CreateUserDTO){
        return await this.userService.CreateUser(input);
   }
}
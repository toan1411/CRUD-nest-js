
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./create-user.dto";
import { ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";


@Controller('/user')
export class UserController {
   constructor(private readonly userService: UserService){}

    @Get(":id")
    @ApiBearerAuth()
    @ApiCreatedResponse()
    async getUserById(@Param("id") id){
        return await this.userService.getUserById(id);
    }

   @Post()
   @ApiCreatedResponse()
   async createUser( @Body() input : CreateUserDTO){
        return await this.userService.CreateUser(input);
   }
}
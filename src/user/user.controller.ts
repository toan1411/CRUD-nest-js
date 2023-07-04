
import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./dto/user.dto";
import { ApiCreatedResponse } from "@nestjs/swagger";


@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async listUser(@Query('page') page: number, @Query('limit') limit: number, @Query('username') jobTitble: string) {

        const options = {
            page: page,
            limit: limit,
            jobTitble: jobTitble
        }
        return this.userService.listUser(options)
    }


    @Post()
    @ApiCreatedResponse()
    async createUser(@Body() input: UserDTO) {
        return await this.userService.createUser(input);
    }

    @Patch(':id')
    async updateUser(@Param('id') id, @Body() input: UserDTO) {
        return await this.userService.updateUser(id,input)
    }
}
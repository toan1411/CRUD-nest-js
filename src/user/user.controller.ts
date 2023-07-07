
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "./user.entity";


@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async listUser(@Query('page') page: number, @Query('limit') limit: number, @Query('jobTitble') jobTitble: string) {
        const options = {
            page: page,
            limit: limit,
            jobTitble: jobTitble
        }
        return this.userService.listUser(options)
    }

    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'show profile of user' })
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@CurrentUser() user: User) {
        return user;
    }

    @Post()
    @ApiCreatedResponse()
    async createUser(@Body() input: CreateUserDTO) {
        return await this.userService.createUser(input);
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() input: CreateUserDTO) {
        return await this.userService.updateUser(id, input)
    }
}
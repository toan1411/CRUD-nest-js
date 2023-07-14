
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiProperty, ApiQuery } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "./entities/user.entity";
import { Role } from "./entities/role.enum";
import RoleGuard from "../auth/guard/role.guard";
import { UpdateUserDto } from "./dto/update-user.dto";


@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @UseGuards(RoleGuard(Role.ADMIN))
    @UseGuards(AuthGuard('jwt'))
    @ApiProperty({ required: false }) 
    @ApiQuery({name: 'page', required: false})
    @ApiQuery({name: 'limit', required: false})
    @ApiBearerAuth()
    async listUser(@Query('page') page: number, @Query('limit') limit: number) {
        const options = {
            page: page,
            limit: limit
        }
        return this.userService.listUser(options)
    }

    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'show profile of user'})
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@CurrentUser() user: User) {
        return user;
    }

    @Post()
    @UseGuards(RoleGuard(Role.ADMIN))
    @UseGuards(AuthGuard('jwt'))
    @ApiCreatedResponse()
    @ApiBearerAuth() 
    async createUser(@Body() input: CreateUserDTO) {
        return await this.userService.createUser(input);
    }

    @Patch(':id')
    @UseGuards(RoleGuard(Role.ADMIN))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateUser(@Param('id') id: number, @Body() input: UpdateUserDto) {
        return await this.userService.updateUser(id, input)
    }

    @Delete(':id')
    @UseGuards(RoleGuard(Role.ADMIN))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @HttpCode(204)
    async remove(@Param('id') id: number) {
        return await this.userService.removeUser(id);
    }
}
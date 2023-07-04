import {  Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { LoginDto } from "./login.dto";
import { User } from "src/user/user.entity";




@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: 'user login here' })
    @ApiUnauthorizedResponse()
    @ApiBody({type : LoginDto })
    @ApiCreatedResponse()
    async login(@CurrentUser() user : User) {
        return {
            userID: user.id,
            token: this.authService.getTokenForUser(user)
        }
    }

    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'show profile of user' })
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@CurrentUser() user : User) {
        return user;
    }
}
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { LoginDto } from "./login.dto";


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: 'user login here' })
    @ApiCreatedResponse()
    async login(@CurrentUser() user) {
        return {
            userID: user.id,
            token: this.authService.getTokenForUser(user)
        }
    }

    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'show profile of user' })
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@CurrentUser() user) {
        return user;
    }
}
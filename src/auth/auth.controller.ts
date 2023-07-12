import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { User } from "src/user/entities/user.entity";




@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: 'user login here' })
    @ApiUnauthorizedResponse()
    @ApiBody({ type: LoginDto})
    @ApiCreatedResponse()
    async login(@CurrentUser() user: User) {
        return {
            userID: user.id,
            token: this.authService.getTokenForUser(user)
        }
    }
}
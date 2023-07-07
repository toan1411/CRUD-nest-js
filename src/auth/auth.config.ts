
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";


export class JwtConfig {
    static getConfigJwt(configService: ConfigService): JwtModuleOptions {
        return {
            secret: configService.get('AUTH_SECRET'),
            signOptions: {
                expiresIn:configService.get('EXPIRES_IN')
            }
        }
    }
}

export const jwtConfigAsync: JwtModuleAsyncOptions = {

    imports: [ConfigModule],

    useFactory: async (configService: ConfigService) => JwtConfig.getConfigJwt(configService),
    inject: [ConfigService]

}

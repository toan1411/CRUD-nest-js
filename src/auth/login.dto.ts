import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class LoginDto {
    @Length(5)
    @ApiProperty({example: "username"})
    username: string;
    @Length(8)
    @ApiProperty({example: "password"})
    password: string
}
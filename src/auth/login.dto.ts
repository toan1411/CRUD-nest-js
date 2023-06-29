import { Length } from "class-validator";

export class LoginDto {
    @Length(5)
    username: string;
    @Length(8)
    password: string
}
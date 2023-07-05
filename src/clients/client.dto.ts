import { Length } from "class-validator";

export class ClientDto{
    @Length(5)
    username: string;
    @Length(2)
    fristname: string;
    @Length(2)
    lastname: string;
    @Length(2)
    local: string;
}
import { Length } from "class-validator";

export class CreateEventDTO{
    @Length(5,255, {"message": "Lenght of name is wrong"})
    name: string;
    @Length(5,255,{groups:['create']})
    @Length(10,255,{groups:['update']})
    description: string;
    when: string;
    address: string;
}
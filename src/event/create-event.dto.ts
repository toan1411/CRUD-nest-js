import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateEventDTO{
    @ApiProperty({})
    @Length(5,255, {"message": "Lenght of name is wrong"})
    name: string;
    @Length(5,255,{groups:['create']})
    @Length(10,255,{groups:['update']})
    @ApiProperty({})
    description: string;
    @ApiProperty({})
    when: string;
    @ApiProperty({})
    address: string;
}
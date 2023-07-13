import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateClientDto{
    @Length(5)
    @ApiProperty({example:"client"})
    username: string;

    @Length(2)
    @ApiProperty({example:"ahaha"})
    fristname: string;

    @Length(2)
    @ApiProperty({example:"hihih"})
    lastname: string;

    @Length(2)
    @ApiProperty({example:"USA"})
    local: string;

}
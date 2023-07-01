import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, Length } from "class-validator";

export class EventDTO{
    @ApiProperty()
    @Length(5,255, {"message": "Lenght of name is wrong"})
    name: string;
  
    @Length(10,255)
    @ApiProperty()
    description: string;
    @ApiProperty()
    @IsDateString()
    when: string;
    @ApiProperty()
    address: string;
}
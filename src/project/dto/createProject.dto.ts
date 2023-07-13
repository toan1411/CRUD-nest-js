import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, Length } from "class-validator";

export class CreateProjectDto{
    @Length(5)
    @ApiProperty({example:"project"})
    name: string;
    
    @IsDateString()
    @ApiProperty({example:"2022-2-12T00:00:00:000"})
    timeStart: Date;

    @IsDateString()
    @ApiProperty({example:"2022-2-12T00:00:00:000"})
    timeEnd: Date;

    @IsNumber()
    @ApiProperty({example:1})
    idOfClient: number;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, Length } from "class-validator";

export class CreateTaskDto{
    @Length(5)
    @ApiProperty({example: "task"})
    name: string;
    
    @Length(3)
    @ApiProperty({example: "none"})
    status: string;

    @IsDateString()
    timeStart: Date;

    @IsDateString()
    timeEnd: Date;

    @Length(5)
    @ApiProperty({example:'none'})
    note: string;

    @IsNumber()
    @ApiProperty({example:'1'})
    idOfProject: number;
}
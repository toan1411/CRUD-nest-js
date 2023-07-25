import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Length } from "class-validator";
import { Status } from "./status.enum";

export class CreateTimesheetDto{
    @Length(3)
    @ApiProperty({example:"timesheet"})
    name:string;

    @ApiProperty({example:"new"})
    status:Status;

    @Length(3)
    @ApiProperty({example:"none"})
    note: string; 

    @IsNumber()
    @ApiProperty({example: 8})
    workingTime: number

    @IsNumber()
    @ApiProperty({example: 1})
    idOfProject:number
}
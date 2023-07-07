import { IsDateString, IsNumber, Length } from "class-validator";

export class CreateTaskDto{
    @Length(5)
    name: string;
    
    @Length(5)
    status: string;

    @IsDateString()
    timeStart: Date;

    @IsDateString()
    timeEnd: Date;

    @Length(5)
    note: string;

    @IsNumber()
    idOfProject: number;
}
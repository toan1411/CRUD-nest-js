import { IsDateString, IsNumber, Length } from "class-validator";

export class CreateTimesheetDto{
    @Length(3)
    name:string;

    @Length(5)
    status:string;

    @Length(3)
    note: string;

    @IsDateString()
    date: Date;

    @IsNumber()
    idOfProject: number;

    @IsNumber()
    idOfUser:number;
}
import { IsDateString, IsNumber, IsOptional, Length } from "class-validator";

export class UpdateTimesheetDto{
    @IsOptional()
    @Length(3)
    name:string;

    @IsOptional()
    @Length(5)
    status:string;

    @IsOptional()
    @Length(5)
    note: string;

    @IsOptional()
    @IsDateString()
    date: Date;

    @IsOptional()
    @IsNumber()
    idOfProject: number;

    @IsOptional()
    @IsNumber()
    idOfUser:number;
}
import { IsDateString, IsNumber, IsOptional, Length } from "class-validator";
import { Status } from "./status.enum";

export class UpdateTimesheetDto {
    @IsOptional()
    @Length(3)
    name: string;

    @IsOptional()
    status: Status;

    @IsOptional()
    @Length(5)
    note: string;

    @IsDateString()
    date: Date;

    @IsOptional()
    @IsNumber()
    workingTime: number

}
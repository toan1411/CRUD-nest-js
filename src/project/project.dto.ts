import { IsDateString, IsNumber, Length } from "class-validator";

export class ProjectDto{
    @Length(5)
    name: string;
    @IsDateString()
    timeStart: Date;
    @IsDateString()
    timeEnd: Date;
    @IsNumber()
    idOfClient: number;
}
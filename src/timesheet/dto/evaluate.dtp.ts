import { IsDateString, IsEnum, IsNumber,  } from "class-validator";
import { Status } from "./status.enum";

export class EvaluateDto {
    @IsDateString ()
    day: Date;

    @IsNumber()
    idOfProject: number;

    @IsEnum(Status)
    status: Status
}
import { IsDateString, IsNumber,  } from "class-validator";

export class SubmitDto {
    @IsDateString ()
    day: Date;

    @IsNumber()
    idOfProject: number
}
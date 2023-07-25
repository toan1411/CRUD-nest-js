import { IsNumber } from "class-validator";

export class UserProjecDto{
    @IsNumber()
    projectId: number;

    @IsNumber()
    userId: number;
}
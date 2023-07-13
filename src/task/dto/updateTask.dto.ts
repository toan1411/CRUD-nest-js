import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, Length } from "class-validator";

export class UpdateTaskDto{
    @Length(5)
    @ApiProperty({example: "task"})
    @IsOptional()
    name: string;
    
    @Length(3)
    @ApiProperty({example: "none"})
    @IsOptional()
    status: string;

    @IsDateString()
    @IsOptional()
    timeStart: Date;

    @IsDateString()
    @IsOptional()
    timeEnd: Date;

    @Length(5)
    @ApiProperty({example:'none'})
    @IsOptional()
    note: string;

    @IsNumber()
    @ApiProperty({example:'1'})
    @IsOptional()
    idOfProject: number;
}
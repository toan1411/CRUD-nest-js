import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, Length } from "class-validator";

export class UpdateProjectDto{
    @Length(5)
    @IsOptional()
    @ApiProperty({example:"project"})
    name: string;
    
    @IsDateString()
    @IsOptional()
    @ApiProperty({example:"2022-2-12T00:00:00:000"})
    timeStart: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty({example:"2022-2-12T00:00:00:000"})
    timeEnd: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({example:1})
    idOfClient: number;
}
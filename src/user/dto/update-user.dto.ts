import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, Length } from "class-validator";
import { Role } from "../entities/role.enum";

export class UpdateUserDto{
    @Length(5)
    @IsOptional()
    @ApiProperty({example:"toan123"})
    username: string;
    
    @Length(8)
    @IsOptional()
    @ApiProperty({example:"12345678"})
    password: string;

    @Length(8)
    @IsOptional()
    @ApiProperty({example:"12345678"})
    retypePassword:string;

    @Length(2)
    @IsOptional()
    @ApiProperty({example:"Toan"})
    firstName: string;

    @Length(2)
    @IsOptional()
    @ApiProperty({example:"Nguyen"})
    lastName: string;

    @Length(2)
    @IsOptional()
    @ApiProperty({example:"Nam"})
    sex: string;

    @Length(10)
    @IsOptional()
    @ApiProperty({example:"0123456789"})
    phoneNumber: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({example: true})
    isActive: boolean;

    @IsEmail()
    @IsOptional()
    @ApiProperty({example:"nguyentoan@gmail.com"})
    email: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({example:1})
    idOfProject: number;

    @IsEnum(Role)
    @IsOptional()
    @ApiProperty({example:"user"})
    roles:Role[];

}
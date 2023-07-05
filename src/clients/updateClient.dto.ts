import { IsOptional, Length } from "class-validator";

export class UpdateClientDto{
    @Length(5)
    @IsOptional()
    username?: string;
    @IsOptional()
    @Length(5)
    fristname?: string;
    @IsOptional()
    @Length(5)
    lastname?: string;
    @IsOptional()
    @Length(5)
    local?: string;
}
import { Length } from "class-validator";

export class Day {
    @Length(2)
    yearStart: string;

    @Length(2)
    monthStart: string;

    @Length(2)
    dayStart: string;

    @Length(2)
    yearEnd: string;

    @Length(2)
    monthEnd: string;

    @Length(2)
    dayEnd: string
}
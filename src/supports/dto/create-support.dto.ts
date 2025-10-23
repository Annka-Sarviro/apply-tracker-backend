import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSupportDto {
  @ApiProperty({ description: "Note name" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Note text content", required: true })
  @IsString()
  @IsNotEmpty()
  text: string;
}

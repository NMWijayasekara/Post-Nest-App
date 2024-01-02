import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmptyObject()
  title: string;

  @ApiProperty()
  @IsNotEmptyObject()
  body: string;
}

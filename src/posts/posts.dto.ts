import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;
}

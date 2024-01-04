import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';

export class PostDetailsDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;
}
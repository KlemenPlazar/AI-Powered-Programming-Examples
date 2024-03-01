import { ApiProperty } from '@nestjs/swagger';

export class CreateMoveDto {
  @ApiProperty({ example: 0, description: 'The X coordinate of the move' })
  x: number;

  @ApiProperty({ example: 0, description: 'The Y coordinate of the move' })
  y: number;
}

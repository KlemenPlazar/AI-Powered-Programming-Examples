import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMoveDto } from './create-move.dto';
import { GameService } from './game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('board')
  @ApiOperation({ summary: 'Get current board state' })
  @ApiResponse({ status: 200, description: 'The board state' })
  getBoard() {
    return this.gameService.getBoard();
  }

  @Post('move')
  @ApiOperation({ summary: 'Make a move' })
  @ApiResponse({ status: 200, description: 'Move made' })
  @ApiBody({ type: CreateMoveDto })
  makeMove(@Body() move: CreateMoveDto) {
    return {
      success: this.gameService.makeMove(move.x, move.y),
      board: this.gameService.getBoard(),
    };
  }

  @Get('check-win')
  @ApiOperation({ summary: 'Check if there is a win' })
  @ApiResponse({ status: 200, description: 'Win status' })
  checkWin() {
    return this.gameService.checkWin();
  }

  @Get('check-draw')
  @ApiOperation({ summary: 'Check if there is a draw' })
  @ApiResponse({ status: 200, description: 'Draw status' })
  checkDraw() {
    return this.gameService.checkDraw();
  }

  @Post('reset')
  @ApiOperation({ summary: 'Reset the game' })
  @ApiResponse({ status: 200, description: 'Game reset successfully' })
  resetGame() {
    this.gameService.resetGame();
    return { message: 'Game reset successfully' };
  }
}

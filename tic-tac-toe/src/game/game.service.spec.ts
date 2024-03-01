import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('makeMove', () => {
    it('should allow a valid move', () => {
      expect(service.makeMove(0, 0)).toBeTruthy();
      expect(service.getBoard()).toContain('X');
    });

    it('should reject an invalid move', () => {
      service.makeMove(0, 0); // First move
      expect(service.makeMove(0, 0)).toBeFalsy(); // Repeat move
    });
  });

  describe('checkWin', () => {
    it('should detect a win', () => {
      service.makeMove(0, 0); // X
      service.makeMove(1, 0); // O
      service.makeMove(0, 1); // X
      service.makeMove(1, 1); // O
      service.makeMove(0, 2); // X wins
      expect(service.checkWin()).toBeTruthy();
    });
  });

  describe('checkDraw', () => {
    it('should detect a draw', () => {
      service.makeMove(0, 0); // X
      service.makeMove(0, 1); // O
      service.makeMove(0, 2); // X
      service.makeMove(1, 1); // O
      service.makeMove(1, 0); // X
      service.makeMove(2, 0); // O
      service.makeMove(1, 2); // X
      service.makeMove(2, 2); // O
      service.makeMove(2, 1); // X
      expect(service.checkDraw()).toBeTruthy();
      expect(service.checkWin()).toBeFalsy();
    });
  });

  describe('resetGame', () => {
    it('should reset the game', () => {
      service.makeMove(0, 0); // Make some moves
      service.resetGame(); // Reset
      expect(service.getBoard()).not.toContain('X' || 'O');
    });
  });
});

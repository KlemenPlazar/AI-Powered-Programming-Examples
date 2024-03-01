import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  private board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  private currentPlayer: 'X' | 'O' = 'X';

  getBoard(): string {
    // Convert each row into a string and join rows with line breaks
    return this.board
      .map((row) => row.map((cell) => cell || ' ').join('|'))
      .join('\n');
  }

  makeMove(y: number, x: number): boolean {
    if (this.board[y][x] || y > 2 || x > 2 || y < 0 || x < 0) {
      return false;
    }
    this.board[y][x] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    return true;
  }

  checkWin(): boolean {
    const lines = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [2, 0],
        [1, 1],
        [0, 2],
      ],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (
        this.board[a[0]][a[1]] &&
        this.board[a[0]][a[1]] === this.board[b[0]][b[1]] &&
        this.board[a[0]][a[1]] === this.board[c[0]][c[1]]
      ) {
        return true;
      }
    }
    return false;
  }

  checkDraw(): boolean {
    return this.board.every((row) => row.every((cell) => cell !== ''));
  }

  resetGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
  }
}

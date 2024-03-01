# Tic-Tac-Toe API

This project is a simple Tic-Tac-Toe game implemented as a RESTful API using NestJS and TypeScript. It allows two players to play Tic-Tac-Toe in turns. The game state is maintained in memory, so no database setup is required. The API supports creating a game, making moves, checking for a win or a draw, and resetting the game.

## Features

- **Get Board State**: Retrieve the current state of the game board.
- **Make a Move**: Place an 'X' or 'O' on the board.
- **Check Win**: Determine if there's a winning condition on the board.
- **Check Draw**: Check if the game has ended in a draw.
- **Reset Game**: Clear the board and start a new game.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (LTS version)
- npm (comes with Node.js)
- NestJS CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://yourrepositoryurl.git
   cd tic-tac-toe
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start:dev
   ```

The server should start, and you can now access the API at `http://localhost:3000`.

## API Endpoints

- `GET /game/board` - Get the current game board.
- `POST /game/move` - Make a move. Requires a body with `x` and `y` coordinates, e.g., `{ "x": 0, "y": 1 }`.
- `GET /game/check-win` - Check if there is a win condition on the board.
- `GET /game/check-draw` - Check if the game is a draw.
- `POST /game/reset` - Reset the game board for a new game.

## Main Methods

### GameService

- **getBoard()**: Returns the current state of the game board as a string, using ASCII art for visualization.
- **makeMove(x: number, y: number)**: Allows a player to make a move by specifying the row (`x`) and column (`y`). It checks for valid moves and alternates between players.
- **checkWin()**: Checks the board for any winning conditions and returns `true` if a win is detected.
- **checkDraw()**: Checks if all cells on the board are filled without any player winning, indicating a draw.
- **resetGame()**: Clears the game board and resets the game for a new round.

## Testing

Run the automated tests for this system using:

    ```bash
    npm test
    ```

## Built With

- [NestJS](https://nestjs.com/) - The framework used
- [TypeScript](https://www.typescriptlang.org/) - Programming language

## Authors

- Klemen

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- ChatGPT

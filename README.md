# Chess Game

A fully functional chess game implementation in Python with move validation, check detection, and an interactive command-line interface.

## Features

- Complete chess piece implementation (King, Queen, Rook, Bishop, Knight, Pawn)
- Full move validation for each piece type
- Check detection to prevent invalid moves
- Turn-based gameplay
- Interactive command-line interface with Unicode chess symbols
- Standard chess notation (e.g., e2 e4)
- Move history tracking

## Requirements

- Python 3.6 or higher
- No external dependencies required

## Installation

Clone the repository:
```bash
git clone https://github.com/aungzawmyo/chess.git
cd chess
```

## Usage

To start a new chess game:

```bash
python3 chess.py
```

### How to Play

1. The game starts with white's turn
2. Enter moves in chess notation format: `source destination` (e.g., `e2 e4`)
3. The board uses standard chess notation:
   - Columns: a-h (left to right)
   - Rows: 1-8 (bottom to top for white)
4. Type `quit` to exit the game

### Example Game

```
WHITE's turn
Enter move: e2 e4
✓ Move successful

BLACK's turn
Enter move: e7 e5
✓ Move successful
```

## Board Representation

The game uses Unicode symbols for chess pieces:
- White pieces: ♔ ♕ ♖ ♗ ♘ ♙
- Black pieces: ♚ ♛ ♜ ♝ ♞ ♟

## Rules Implemented

- Standard chess piece movement rules
- Turn alternation between white and black
- Check detection (prevents moves that put own king in check)
- Piece capture
- Pawn special moves (two squares from starting position)
- Move validation to prevent illegal moves

## Testing

Run the test suite:

```bash
python3 test_chess.py
```

The test suite includes:
- Individual piece movement validation
- Game rule enforcement
- Turn management
- Capture mechanics
- Check detection

## Project Structure

- `chess.py` - Main game implementation with all chess logic
- `test_chess.py` - Comprehensive unit tests
- `README.md` - This file

## Future Enhancements

Potential improvements for future versions:
- Checkmate detection
- Stalemate detection
- Castling
- En passant
- Pawn promotion
- Move notation history display
- Save/load game state
- GUI interface

## License

See LICENSE file for details.

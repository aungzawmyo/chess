#!/usr/bin/env python3
"""
Simple Chess Game Implementation
A basic chess game with move validation and game state management.
"""


class Piece:
    """Base class for all chess pieces."""
    
    def __init__(self, color, position):
        self.color = color  # 'white' or 'black'
        self.position = position  # tuple (row, col)
        self.has_moved = False
    
    def __str__(self):
        return self.symbol
    
    def is_valid_move(self, board, end_pos):
        """Check if a move is valid for this piece."""
        raise NotImplementedError("Subclasses must implement is_valid_move")
    
    def get_possible_moves(self, board):
        """Get all possible moves for this piece."""
        moves = []
        for row in range(8):
            for col in range(8):
                if self.is_valid_move(board, (row, col)):
                    moves.append((row, col))
        return moves


class Pawn(Piece):
    """Pawn piece."""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = '♟' if color == 'black' else '♙'
    
    def is_valid_move(self, board, end_pos):
        start_row, start_col = self.position
        end_row, end_col = end_pos
        
        direction = -1 if self.color == 'white' else 1
        
        # Move forward one square
        if end_col == start_col and end_row == start_row + direction:
            if board[end_row][end_col] is None:
                return True
        
        # Move forward two squares from starting position
        if not self.has_moved and end_col == start_col:
            if end_row == start_row + 2 * direction:
                if (board[end_row][end_col] is None and 
                    board[start_row + direction][start_col] is None):
                    return True
        
        # Capture diagonally
        if abs(end_col - start_col) == 1 and end_row == start_row + direction:
            target = board[end_row][end_col]
            if target and target.color != self.color:
                return True
        
        return False


class Rook(Piece):
    """Rook piece."""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = '♜' if color == 'black' else '♖'
    
    def is_valid_move(self, board, end_pos):
        start_row, start_col = self.position
        end_row, end_col = end_pos
        
        if start_row != end_row and start_col != end_col:
            return False
        
        # Check path is clear
        if start_row == end_row:
            step = 1 if end_col > start_col else -1
            for col in range(start_col + step, end_col, step):
                if board[start_row][col] is not None:
                    return False
        else:
            step = 1 if end_row > start_row else -1
            for row in range(start_row + step, end_row, step):
                if board[row][start_col] is not None:
                    return False
        
        # Check destination
        target = board[end_row][end_col]
        return target is None or target.color != self.color


class Knight(Piece):
    """Knight piece."""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = '♞' if color == 'black' else '♘'
    
    def is_valid_move(self, board, end_pos):
        start_row, start_col = self.position
        end_row, end_col = end_pos
        
        row_diff = abs(end_row - start_row)
        col_diff = abs(end_col - start_col)
        
        if not ((row_diff == 2 and col_diff == 1) or (row_diff == 1 and col_diff == 2)):
            return False
        
        target = board[end_row][end_col]
        return target is None or target.color != self.color


class Bishop(Piece):
    """Bishop piece."""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = '♝' if color == 'black' else '♗'
    
    def is_valid_move(self, board, end_pos):
        start_row, start_col = self.position
        end_row, end_col = end_pos
        
        if abs(end_row - start_row) != abs(end_col - start_col):
            return False
        
        # Check path is clear
        row_step = 1 if end_row > start_row else -1
        col_step = 1 if end_col > start_col else -1
        
        row, col = start_row + row_step, start_col + col_step
        while row != end_row and col != end_col:
            if board[row][col] is not None:
                return False
            row += row_step
            col += col_step
        
        target = board[end_row][end_col]
        return target is None or target.color != self.color


class Queen(Piece):
    """Queen piece."""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = '♛' if color == 'black' else '♕'
    
    def is_valid_move(self, board, end_pos):
        start_row, start_col = self.position
        end_row, end_col = end_pos
        
        # Queen moves like a rook or bishop
        is_rook_move = (start_row == end_row or start_col == end_col)
        is_bishop_move = (abs(end_row - start_row) == abs(end_col - start_col))
        
        if not (is_rook_move or is_bishop_move):
            return False
        
        # Check path is clear
        if is_rook_move and start_row == end_row:
            step = 1 if end_col > start_col else -1
            for col in range(start_col + step, end_col, step):
                if board[start_row][col] is not None:
                    return False
        elif is_rook_move:
            step = 1 if end_row > start_row else -1
            for row in range(start_row + step, end_row, step):
                if board[row][start_col] is not None:
                    return False
        else:
            row_step = 1 if end_row > start_row else -1
            col_step = 1 if end_col > start_col else -1
            row, col = start_row + row_step, start_col + col_step
            while row != end_row and col != end_col:
                if board[row][col] is not None:
                    return False
                row += row_step
                col += col_step
        
        target = board[end_row][end_col]
        return target is None or target.color != self.color


class King(Piece):
    """King piece."""
    
    def __init__(self, color, position):
        super().__init__(color, position)
        self.symbol = '♚' if color == 'black' else '♔'
    
    def is_valid_move(self, board, end_pos):
        start_row, start_col = self.position
        end_row, end_col = end_pos
        
        row_diff = abs(end_row - start_row)
        col_diff = abs(end_col - start_col)
        
        if row_diff > 1 or col_diff > 1:
            return False
        
        target = board[end_row][end_col]
        return target is None or target.color != self.color


class ChessBoard:
    """Chess board and game state management."""
    
    def __init__(self):
        self.board = [[None for _ in range(8)] for _ in range(8)]
        self.current_turn = 'white'
        self.move_history = []
        self.setup_board()
    
    def setup_board(self):
        """Set up the initial chess board."""
        # Place pawns
        for col in range(8):
            self.board[1][col] = Pawn('black', (1, col))
            self.board[6][col] = Pawn('white', (6, col))
        
        # Place rooks
        self.board[0][0] = Rook('black', (0, 0))
        self.board[0][7] = Rook('black', (0, 7))
        self.board[7][0] = Rook('white', (7, 0))
        self.board[7][7] = Rook('white', (7, 7))
        
        # Place knights
        self.board[0][1] = Knight('black', (0, 1))
        self.board[0][6] = Knight('black', (0, 6))
        self.board[7][1] = Knight('white', (7, 1))
        self.board[7][6] = Knight('white', (7, 6))
        
        # Place bishops
        self.board[0][2] = Bishop('black', (0, 2))
        self.board[0][5] = Bishop('black', (0, 5))
        self.board[7][2] = Bishop('white', (7, 2))
        self.board[7][5] = Bishop('white', (7, 5))
        
        # Place queens
        self.board[0][3] = Queen('black', (0, 3))
        self.board[7][3] = Queen('white', (7, 3))
        
        # Place kings
        self.board[0][4] = King('black', (0, 4))
        self.board[7][4] = King('white', (7, 4))
    
    def display(self):
        """Display the chess board."""
        print("\n  a b c d e f g h")
        for row in range(8):
            print(f"{8 - row} ", end="")
            for col in range(8):
                piece = self.board[row][col]
                if piece:
                    print(f"{piece} ", end="")
                else:
                    print(". ", end="")
            print(f"{8 - row}")
        print("  a b c d e f g h\n")
    
    def parse_position(self, pos):
        """Parse chess notation (e.g., 'e2') to board coordinates."""
        if len(pos) != 2:
            return None
        col = ord(pos[0].lower()) - ord('a')
        row = 8 - int(pos[1])
        if 0 <= row < 8 and 0 <= col < 8:
            return (row, col)
        return None
    
    def get_piece_at(self, position):
        """Get the piece at a given position."""
        row, col = position
        return self.board[row][col]
    
    def is_in_check(self, color):
        """Check if the king of the given color is in check."""
        # Find the king
        king_pos = None
        for row in range(8):
            for col in range(8):
                piece = self.board[row][col]
                if piece and isinstance(piece, King) and piece.color == color:
                    king_pos = (row, col)
                    break
            if king_pos:
                break
        
        if not king_pos:
            return False
        
        # Check if any opponent piece can capture the king
        opponent_color = 'black' if color == 'white' else 'white'
        for row in range(8):
            for col in range(8):
                piece = self.board[row][col]
                if piece and piece.color == opponent_color:
                    if piece.is_valid_move(self.board, king_pos):
                        return True
        
        return False
    
    def move_piece(self, start_pos, end_pos):
        """Move a piece from start to end position."""
        start_row, start_col = start_pos
        end_row, end_col = end_pos
        
        piece = self.board[start_row][start_col]
        
        if not piece:
            return False, "No piece at starting position"
        
        if piece.color != self.current_turn:
            return False, f"It's {self.current_turn}'s turn"
        
        if not piece.is_valid_move(self.board, end_pos):
            return False, "Invalid move for this piece"
        
        # Simulate the move to check if it puts own king in check
        captured_piece = self.board[end_row][end_col]
        self.board[end_row][end_col] = piece
        self.board[start_row][start_col] = None
        piece.position = end_pos
        
        if self.is_in_check(self.current_turn):
            # Undo the move
            self.board[start_row][start_col] = piece
            self.board[end_row][end_col] = captured_piece
            piece.position = start_pos
            return False, "Move would put your king in check"
        
        # Move is valid
        piece.has_moved = True
        self.move_history.append((start_pos, end_pos, captured_piece))
        
        # Switch turns
        self.current_turn = 'black' if self.current_turn == 'white' else 'white'
        
        return True, "Move successful"
    
    def play(self):
        """Main game loop."""
        print("=== Chess Game ===")
        print("Enter moves in format: e2 e4 (from to)")
        print("Type 'quit' to exit\n")
        
        while True:
            self.display()
            
            if self.is_in_check(self.current_turn):
                print(f"⚠️  {self.current_turn.upper()} is in CHECK!")
            
            print(f"{self.current_turn.upper()}'s turn")
            move_input = input("Enter move: ").strip().lower()
            
            if move_input == 'quit':
                print("Thanks for playing!")
                break
            
            parts = move_input.split()
            if len(parts) != 2:
                print("Invalid input. Use format: e2 e4")
                continue
            
            start_pos = self.parse_position(parts[0])
            end_pos = self.parse_position(parts[1])
            
            if not start_pos or not end_pos:
                print("Invalid position. Use format like e2, a1, h8")
                continue
            
            success, message = self.move_piece(start_pos, end_pos)
            if success:
                print(f"✓ {message}")
            else:
                print(f"✗ {message}")


def main():
    """Main entry point."""
    game = ChessBoard()
    game.play()


if __name__ == "__main__":
    main()

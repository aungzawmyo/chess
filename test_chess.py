#!/usr/bin/env python3
"""
Unit tests for the chess game implementation.
"""

import unittest
from chess import (
    ChessBoard, Pawn, Rook, Knight, Bishop, Queen, King
)


class TestPieceMovement(unittest.TestCase):
    """Test individual piece movement rules."""
    
    def setUp(self):
        """Set up a fresh board for each test."""
        self.board = ChessBoard()
    
    def test_pawn_forward_one(self):
        """Test pawn moving forward one square."""
        success, _ = self.board.move_piece((6, 4), (5, 4))  # e2 to e3
        self.assertTrue(success)
    
    def test_pawn_forward_two_from_start(self):
        """Test pawn moving forward two squares from starting position."""
        success, _ = self.board.move_piece((6, 4), (4, 4))  # e2 to e4
        self.assertTrue(success)
    
    def test_pawn_cannot_move_backward(self):
        """Test that pawns cannot move backward."""
        # Move pawn forward first
        self.board.move_piece((6, 4), (5, 4))
        self.board.current_turn = 'white'  # Reset turn
        # Try to move backward
        success, _ = self.board.move_piece((5, 4), (6, 4))
        self.assertFalse(success)
    
    def test_knight_l_shape(self):
        """Test knight L-shaped movement."""
        success, _ = self.board.move_piece((7, 1), (5, 2))  # b1 to c3
        self.assertTrue(success)
    
    def test_rook_horizontal_movement(self):
        """Test rook moving horizontally."""
        # Clear the way for the rook
        self.board.board[7][1] = None
        self.board.board[7][2] = None
        self.board.board[7][3] = None
        # Move rook
        success, _ = self.board.move_piece((7, 0), (7, 3))  # a1 to d1
        self.assertTrue(success)
    
    def test_bishop_diagonal_movement(self):
        """Test bishop moving diagonally."""
        # Clear the way for the bishop
        self.board.board[6][3] = None
        # Move bishop
        success, _ = self.board.move_piece((7, 2), (5, 4))  # c1 to e3
        self.assertTrue(success)
    
    def test_queen_movement(self):
        """Test queen can move like rook and bishop."""
        # Clear the way
        self.board.board[6][3] = None
        # Move queen
        success, _ = self.board.move_piece((7, 3), (5, 3))  # d1 to d3
        self.assertTrue(success)
    
    def test_king_one_square(self):
        """Test king moving one square."""
        # Clear the way
        self.board.board[6][4] = None
        # Move king
        success, _ = self.board.move_piece((7, 4), (6, 4))  # e1 to e2
        self.assertTrue(success)
    
    def test_king_cannot_move_two_squares(self):
        """Test king cannot move more than one square."""
        # Clear the way
        self.board.board[6][4] = None
        self.board.board[5][4] = None
        # Try to move king two squares
        success, _ = self.board.move_piece((7, 4), (5, 4))  # e1 to e4
        self.assertFalse(success)


class TestGameRules(unittest.TestCase):
    """Test game rules and state management."""
    
    def setUp(self):
        """Set up a fresh board for each test."""
        self.board = ChessBoard()
    
    def test_turn_alternation(self):
        """Test that turns alternate between white and black."""
        self.assertEqual(self.board.current_turn, 'white')
        self.board.move_piece((6, 4), (4, 4))  # White moves
        self.assertEqual(self.board.current_turn, 'black')
        self.board.move_piece((1, 4), (3, 4))  # Black moves
        self.assertEqual(self.board.current_turn, 'white')
    
    def test_cannot_move_opponent_piece(self):
        """Test that a player cannot move opponent's pieces."""
        # Try to move black piece on white's turn
        success, message = self.board.move_piece((1, 4), (3, 4))
        self.assertFalse(success)
        self.assertIn("turn", message.lower())
    
    def test_cannot_capture_own_piece(self):
        """Test that a piece cannot capture its own color."""
        # Try to move pawn to capture own piece
        success, _ = self.board.move_piece((6, 4), (7, 4))
        self.assertFalse(success)
    
    def test_position_parsing(self):
        """Test chess notation parsing."""
        self.assertEqual(self.board.parse_position('e2'), (6, 4))
        self.assertEqual(self.board.parse_position('a1'), (7, 0))
        self.assertEqual(self.board.parse_position('h8'), (0, 7))
        self.assertIsNone(self.board.parse_position('i9'))
        self.assertIsNone(self.board.parse_position('e'))
    
    def test_piece_has_moved_flag(self):
        """Test that has_moved flag is updated after moving."""
        piece = self.board.get_piece_at((6, 4))
        self.assertFalse(piece.has_moved)
        self.board.move_piece((6, 4), (4, 4))
        self.assertTrue(piece.has_moved)


class TestCapture(unittest.TestCase):
    """Test piece capture mechanics."""
    
    def setUp(self):
        """Set up a fresh board for each test."""
        self.board = ChessBoard()
    
    def test_pawn_diagonal_capture(self):
        """Test pawn capturing diagonally."""
        # Set up a position where white pawn can capture black pawn
        self.board.board[5][4] = Pawn('white', (5, 4))
        self.board.board[4][5] = Pawn('black', (4, 5))
        self.board.current_turn = 'white'
        
        # White pawn captures black pawn
        success, _ = self.board.move_piece((5, 4), (4, 5))
        self.assertTrue(success)
        self.assertIsNotNone(self.board.board[4][5])
        self.assertEqual(self.board.board[4][5].color, 'white')
    
    def test_pawn_cannot_capture_forward(self):
        """Test that pawns cannot capture by moving forward."""
        # Place black pawn in front of white pawn
        self.board.board[5][4] = Pawn('black', (5, 4))
        
        # Try to move white pawn forward to capture
        success, _ = self.board.move_piece((6, 4), (5, 4))
        self.assertFalse(success)


class TestCheck(unittest.TestCase):
    """Test check detection."""
    
    def setUp(self):
        """Set up a fresh board for each test."""
        self.board = ChessBoard()
    
    def test_check_detection(self):
        """Test that check is properly detected."""
        # Set up a simple check scenario
        self.board.board = [[None for _ in range(8)] for _ in range(8)]
        self.board.board[0][4] = King('black', (0, 4))
        self.board.board[7][4] = Rook('white', (7, 4))
        
        self.assertTrue(self.board.is_in_check('black'))
        self.assertFalse(self.board.is_in_check('white'))
    
    def test_cannot_move_into_check(self):
        """Test that a move that puts own king in check is invalid."""
        # Set up a scenario where moving would put king in check
        self.board.board = [[None for _ in range(8)] for _ in range(8)]
        self.board.board[4][4] = King('white', (4, 4))
        self.board.board[4][5] = Rook('white', (4, 5))
        self.board.board[4][7] = Rook('black', (4, 7))
        self.board.current_turn = 'white'
        
        # Try to move rook, which would expose king to check
        success, message = self.board.move_piece((4, 5), (3, 5))
        self.assertFalse(success)
        self.assertIn("check", message.lower())


if __name__ == '__main__':
    unittest.main()

import { useState, useCallback } from 'react';
import { Chess, Square, PieceSymbol } from 'chess.js';
import ChessSquare from './ChessSquare';
import PromotionDialog from './PromotionDialog';

interface ChessBoardProps {
  game: Chess;
  onMove: (from: Square, to: Square, promotion?: PieceSymbol) => void;
  lastMove: { from: Square; to: Square } | null;
}

const PIECES_UNICODE: Record<string, string> = {
  'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
  'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟',
};

export default function ChessBoard({ game, onMove, lastMove }: ChessBoardProps) {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Square[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<{ square: Square; piece: string } | null>(null);
  const [promotionMove, setPromotionMove] = useState<{ from: Square; to: Square } | null>(null);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const handleSquareClick = useCallback((square: Square) => {
    const piece = game.get(square);

    if (selectedSquare) {
      if (legalMoves.includes(square)) {
        const piece = game.get(selectedSquare);
        if (piece?.type === 'p' && (square[1] === '8' || square[1] === '1')) {
          setPromotionMove({ from: selectedSquare, to: square });
        } else {
          onMove(selectedSquare, square);
        }
      } else if (piece && piece.color === game.turn()) {
        const moves = game.moves({ square, verbose: true });
        setSelectedSquare(square);
        setLegalMoves(moves.map((m) => m.to as Square));
      } else {
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    } else if (piece && piece.color === game.turn()) {
      const moves = game.moves({ square, verbose: true });
      setSelectedSquare(square);
      setLegalMoves(moves.map((m) => m.to as Square));
    }
  }, [selectedSquare, legalMoves, game, onMove]);

  const handleDragStart = useCallback((square: Square) => {
    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      const moves = game.moves({ square, verbose: true });
      setDraggedPiece({ square, piece: piece.color + piece.type.toUpperCase() });
      setSelectedSquare(square);
      setLegalMoves(moves.map((m) => m.to as Square));
    }
  }, [game]);

  const handleDragEnd = useCallback(() => {
    setDraggedPiece(null);
    setSelectedSquare(null);
    setLegalMoves([]);
  }, []);

  const handleDrop = useCallback((targetSquare: Square) => {
    if (draggedPiece && legalMoves.includes(targetSquare)) {
      const piece = game.get(draggedPiece.square);
      if (piece?.type === 'p' && (targetSquare[1] === '8' || targetSquare[1] === '1')) {
        setPromotionMove({ from: draggedPiece.square, to: targetSquare });
      } else {
        onMove(draggedPiece.square, targetSquare);
      }
    }
    handleDragEnd();
  }, [draggedPiece, legalMoves, game, onMove, handleDragEnd]);

  const handlePromotion = useCallback((piece: PieceSymbol) => {
    if (promotionMove) {
      onMove(promotionMove.from, promotionMove.to, piece);
      setPromotionMove(null);
    }
  }, [promotionMove, onMove]);

  const isInCheck = (square: Square): boolean => {
    const piece = game.get(square);
    return piece?.type === 'k' && piece.color === game.turn() && game.inCheck();
  };

  const board = game.board();

  return (
    <>
      <div className="relative inline-block">
        <div className="grid grid-cols-8 border-2 border-primary shadow-md rounded-md overflow-hidden">
          {ranks.map((rank, rankIndex) =>
            files.map((file, fileIndex) => {
              const square = (file + rank) as Square;
              const piece = board[rankIndex][fileIndex];
              const pieceSymbol = piece ? PIECES_UNICODE[piece.color + piece.type.toUpperCase()] : null;
              const isLight = (rankIndex + fileIndex) % 2 === 0;
              const isSelected = selectedSquare === square;
              const isLegalMove = legalMoves.includes(square);
              const isLastMove = lastMove && (lastMove.from === square || lastMove.to === square);
              const inCheck = isInCheck(square);

              return (
                <ChessSquare
                  key={square}
                  square={square}
                  piece={pieceSymbol}
                  isLight={isLight}
                  isSelected={isSelected}
                  isLegalMove={isLegalMove}
                  isLastMove={isLastMove}
                  inCheck={inCheck}
                  isDragging={draggedPiece?.square === square}
                  onClick={handleSquareClick}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  showCoordinate={{
                    file: rankIndex === 7,
                    rank: fileIndex === 0,
                  }}
                  fileLabel={file}
                  rankLabel={rank}
                />
              );
            })
          )}
        </div>
      </div>

      {promotionMove && (
        <PromotionDialog
          onSelect={handlePromotion}
          onClose={() => setPromotionMove(null)}
          color={game.turn()}
        />
      )}
    </>
  );
}

import { Square } from 'chess.js';
import { cn } from '@/lib/utils';

interface ChessSquareProps {
  square: Square;
  piece: string | null;
  isLight: boolean;
  isSelected: boolean;
  isLegalMove: boolean;
  isLastMove: boolean;
  inCheck: boolean;
  isDragging: boolean;
  onClick: (square: Square) => void;
  onDragStart: (square: Square) => void;
  onDragEnd: () => void;
  onDrop: (square: Square) => void;
  showCoordinate: { file: boolean; rank: boolean };
  fileLabel: string;
  rankLabel: string;
}

export default function ChessSquare({
  square,
  piece,
  isLight,
  isSelected,
  isLegalMove,
  isLastMove,
  inCheck,
  isDragging,
  onClick,
  onDragStart,
  onDragEnd,
  onDrop,
  showCoordinate,
  fileLabel,
  rankLabel,
}: ChessSquareProps) {
  const handleDragStart = (e: React.DragEvent) => {
    if (piece) {
      e.dataTransfer.effectAllowed = 'move';
      onDragStart(square);
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isLegalMove) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(square);
  };

  return (
    <div
      className={cn(
        'relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-colors cursor-pointer select-none',
        isLight ? 'bg-board-light' : 'bg-board-dark',
        isSelected && 'bg-selected-square',
        isLastMove && 'bg-last-move',
        inCheck && 'bg-check-warning ring-2 ring-check-warning ring-inset'
      )}
      onClick={() => onClick(square)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-testid={`square-${square}`}
    >
      {piece && (
        <div
          className={cn(
            'text-5xl md:text-6xl leading-none select-none transition-opacity',
            isDragging ? 'opacity-30' : 'opacity-100',
            piece.startsWith('♔') || piece.startsWith('♕') || piece.startsWith('♖') || 
            piece.startsWith('♗') || piece.startsWith('♘') || piece.startsWith('♙')
              ? 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'
              : 'text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]'
          )}
          draggable={!!piece}
          onDragStart={handleDragStart}
          onDragEnd={onDragEnd}
          style={{ cursor: piece ? 'grab' : 'default' }}
          data-testid={`piece-${square}`}
        >
          {piece}
        </div>
      )}

      {isLegalMove && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center pointer-events-none',
          )}
        >
          {piece ? (
            <div className="w-full h-full border-4 border-legal-move rounded-sm" />
          ) : (
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-legal-move" />
          )}
        </div>
      )}

      {showCoordinate.file && (
        <div className={cn(
          'absolute bottom-0.5 right-1 text-xs font-medium select-none',
          isLight ? 'text-board-dark' : 'text-board-light'
        )}>
          {fileLabel}
        </div>
      )}

      {showCoordinate.rank && (
        <div className={cn(
          'absolute top-0.5 left-1 text-xs font-medium select-none',
          isLight ? 'text-board-dark' : 'text-board-light'
        )}>
          {rankLabel}
        </div>
      )}
    </div>
  );
}

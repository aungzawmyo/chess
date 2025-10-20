import { PieceSymbol } from 'chess.js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PromotionDialogProps {
  onSelect: (piece: PieceSymbol) => void;
  onClose: () => void;
  color: 'w' | 'b';
}

const PROMOTION_PIECES: { symbol: PieceSymbol; name: string }[] = [
  { symbol: 'q', name: 'Queen' },
  { symbol: 'r', name: 'Rook' },
  { symbol: 'b', name: 'Bishop' },
  { symbol: 'n', name: 'Knight' },
];

const PIECES_UNICODE: Record<string, string> = {
  'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘',
  'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞',
};

export default function PromotionDialog({ onSelect, onClose, color }: PromotionDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <Card className="p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold text-center mb-6">Choose Promotion</h2>
        <div className="grid grid-cols-2 gap-4">
          {PROMOTION_PIECES.map(({ symbol, name }) => {
            const pieceKey = color + symbol.toUpperCase();
            const unicode = PIECES_UNICODE[pieceKey];
            
            return (
              <Button
                key={symbol}
                onClick={() => onSelect(symbol)}
                variant="outline"
                className="h-32 flex flex-col items-center justify-center gap-2 hover-elevate active-elevate-2"
                data-testid={`promotion-${symbol}`}
              >
                <span className={`text-6xl ${color === 'w' ? 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]' : 'text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]'}`}>
                  {unicode}
                </span>
                <span className="text-sm font-medium">{name}</span>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

import { Card } from '@/components/ui/card';

interface CapturedPiecesProps {
  white: string[];
  black: string[];
}

const PIECE_VALUES: Record<string, number> = {
  'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9
};

const PIECES_UNICODE: Record<string, string> = {
  'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
  'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟',
};

export default function CapturedPieces({ white, black }: CapturedPiecesProps) {
  const calculateMaterialAdvantage = () => {
    const whiteValue = white.reduce((sum, piece) => sum + (PIECE_VALUES[piece] || 0), 0);
    const blackValue = black.reduce((sum, piece) => sum + (PIECE_VALUES[piece] || 0), 0);
    return whiteValue - blackValue;
  };

  const advantage = calculateMaterialAdvantage();

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Captured Pieces</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium min-w-[80px]">By White:</span>
          <div className="flex items-center gap-1 flex-wrap" data-testid="captured-by-white">
            {white.length > 0 ? (
              white.map((piece, index) => {
                const unicode = PIECES_UNICODE['b' + piece.toUpperCase()];
                return (
                  <span key={index} className="text-2xl text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
                    {unicode}
                  </span>
                );
              })
            ) : (
              <span className="text-sm text-muted-foreground">None</span>
            )}
          </div>
          {advantage > 0 && (
            <span className="text-sm font-semibold text-primary ml-2" data-testid="material-advantage">
              +{advantage}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium min-w-[80px]">By Black:</span>
          <div className="flex items-center gap-1 flex-wrap" data-testid="captured-by-black">
            {black.length > 0 ? (
              black.map((piece, index) => {
                const unicode = PIECES_UNICODE['w' + piece.toUpperCase()];
                return (
                  <span key={index} className="text-2xl text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                    {unicode}
                  </span>
                );
              })
            ) : (
              <span className="text-sm text-muted-foreground">None</span>
            )}
          </div>
          {advantage < 0 && (
            <span className="text-sm font-semibold text-primary ml-2" data-testid="material-advantage">
              +{Math.abs(advantage)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

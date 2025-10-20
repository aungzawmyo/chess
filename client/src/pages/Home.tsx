import { useState } from 'react';
import { Chess, Square, PieceSymbol } from 'chess.js';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import ChessBoard from '@/components/ChessBoard';
import GameStatus from '@/components/GameStatus';
import CapturedPieces from '@/components/CapturedPieces';
import MoveHistory from '@/components/MoveHistory';

export default function Home() {
  const [game, setGame] = useState(() => new Chess());
  const [moves, setMoves] = useState<string[]>([]);
  const [capturedPieces, setCapturedPieces] = useState<{ white: string[]; black: string[] }>({
    white: [],
    black: [],
  });
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);

  const handleMove = (from: Square, to: Square, promotion?: PieceSymbol) => {
    const gameCopy = new Chess(game.fen());
    
    try {
      const result = gameCopy.move({
        from,
        to,
        promotion: promotion || 'q',
      });

      if (result) {
        setGame(gameCopy);
        setMoves((prev) => [...prev, result.san]);
        setLastMove({ from, to });

        if (result.captured) {
          const capturedPiece = result.captured;
          setCapturedPieces((prev) => ({
            ...prev,
            [result.color === 'w' ? 'white' : 'black']: [
              ...prev[result.color === 'w' ? 'white' : 'black'],
              capturedPiece,
            ],
          }));
        }
      }
    } catch (error) {
      console.error('Invalid move:', error);
    }
  };

  const handleNewGame = () => {
    setGame(new Chess());
    setMoves([]);
    setCapturedPieces({ white: [], black: [] });
    setLastMove(null);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Chess Game</h1>
          <p className="text-muted-foreground">Play chess with complete rules enforcement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          <div className="order-2 lg:order-1 space-y-4">
            <GameStatus game={game} />
            <CapturedPieces white={capturedPieces.white} black={capturedPieces.black} />
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-center gap-4">
            <ChessBoard game={game} onMove={handleMove} lastMove={lastMove} />
            <Button
              onClick={handleNewGame}
              size="lg"
              className="w-full max-w-xs"
              data-testid="button-new-game"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              New Game
            </Button>
          </div>

          <div className="order-3">
            <MoveHistory moves={moves} />
          </div>
        </div>
      </div>
    </div>
  );
}

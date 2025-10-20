import { Chess } from 'chess.js';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GameStatusProps {
  game: Chess;
}

export default function GameStatus({ game }: GameStatusProps) {
  const getGameStatus = () => {
    if (game.isCheckmate()) {
      const winner = game.turn() === 'w' ? 'Black' : 'White';
      return { message: `Checkmate! ${winner} wins!`, type: 'checkmate' };
    }
    if (game.isDraw()) {
      if (game.isStalemate()) {
        return { message: 'Draw by stalemate', type: 'draw' };
      }
      if (game.isThreefoldRepetition()) {
        return { message: 'Draw by threefold repetition', type: 'draw' };
      }
      if (game.isInsufficientMaterial()) {
        return { message: 'Draw by insufficient material', type: 'draw' };
      }
      return { message: 'Draw', type: 'draw' };
    }
    if (game.inCheck()) {
      return { message: 'Check!', type: 'check' };
    }
    
    const turn = game.turn() === 'w' ? 'White' : 'Black';
    return { message: `${turn} to move`, type: 'normal' };
  };

  const status = getGameStatus();
  const isGameOver = game.isGameOver();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-center gap-3">
        {!isGameOver && (
          <div
            className={cn(
              'w-4 h-4 rounded-full',
              game.turn() === 'w' ? 'bg-white border-2 border-foreground' : 'bg-black'
            )}
            data-testid="turn-indicator"
          />
        )}
        <h2
          className={cn(
            'text-xl md:text-2xl font-semibold text-center',
            status.type === 'checkmate' && 'text-primary',
            status.type === 'check' && 'text-check-warning'
          )}
          data-testid="game-status"
        >
          {status.message}
        </h2>
      </div>
    </Card>
  );
}

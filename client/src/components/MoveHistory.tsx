import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface MoveHistoryProps {
  moves: string[];
}

export default function MoveHistory({ moves }: MoveHistoryProps) {
  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: moves[i + 1] || '',
    });
  }

  return (
    <Card className="p-4 h-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Move History</h3>
      <ScrollArea className="h-[400px] pr-4">
        {movePairs.length === 0 ? (
          <p className="text-sm text-muted-foreground" data-testid="no-moves">
            No moves yet
          </p>
        ) : (
          <div className="space-y-1">
            {movePairs.map((pair) => (
              <div
                key={pair.number}
                className={cn(
                  'flex items-center gap-3 py-1.5 px-2 rounded-md text-sm font-mono',
                  pair.number % 2 === 0 ? 'bg-muted/30' : ''
                )}
                data-testid={`move-${pair.number}`}
              >
                <span className="text-muted-foreground font-semibold min-w-[2rem]">
                  {pair.number}.
                </span>
                <span className="min-w-[4rem]">{pair.white}</span>
                {pair.black && <span className="min-w-[4rem]">{pair.black}</span>}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}

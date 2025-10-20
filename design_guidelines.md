# Chess Game Application - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing from Chess.com and Lichess - leading chess platforms known for clean, functional interfaces that prioritize gameplay clarity and piece visibility. Focus on utility, readability, and intuitive interaction patterns.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Forest Green: 120 25% 44% (primary brand, active player indicator, UI accents)
- Cream: 60 56% 91% (secondary UI backgrounds, light elements)
- Blue Accent: 204 70% 53% (action buttons, links, highlights)

**Board Colors:**
- Dark Squares: 30 35% 55% (brown)
- Light Squares: 40 60% 83% (beige)

**Game Elements:**
- Black Pieces: 0 0% 0%
- White Pieces: 0 0% 100%
- Legal Move Indicators: 120 25% 44% with 40% opacity
- Selected Piece Highlight: 60 100% 75% with border
- Check Warning: 0 70% 50%
- Last Move Highlight: 60 40% 70% with 30% opacity

**UI Neutrals:**
- Background: 0 0% 98%
- Card Background: 0 0% 100%
- Text Primary: 0 0% 13%
- Text Secondary: 0 0% 40%
- Border: 0 0% 88%

### B. Typography

**Font Families:**
- Primary: 'Roboto', sans-serif (UI text, game status)
- Secondary: 'Open Sans', sans-serif (move notation, labels)

**Type Scale:**
- Hero/Board Labels: text-4xl (36px), font-bold
- Section Headers: text-2xl (24px), font-semibold
- Game Status: text-xl (20px), font-medium
- Move Notation: text-base (16px), font-normal
- UI Labels: text-sm (14px), font-medium
- Piece Labels: text-xs (12px), font-normal

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 8, 12, and 16 for consistent rhythm
- Component padding: p-4, p-6, p-8
- Section gaps: gap-4, gap-8
- Board margin: m-8
- Button spacing: px-6, py-3

**Grid Structure:**
- Max container width: max-w-7xl
- Centered layout with mx-auto
- Chess board: 8x8 grid with equal square dimensions
- Responsive breakpoints: mobile (640px), tablet (768px), desktop (1024px)

### D. Component Library

**Chess Board:**
- 8x8 grid with alternating dark/brown and light/beige squares
- Square borders: 1px solid with 5% darker shade of square color
- Piece size: 85% of square dimensions for visual breathing room
- Coordinate labels (a-h, 1-8) on edges in text-xs, subtle color
- Board border: 2px solid forest green
- Board shadow: medium drop shadow for depth

**Game Pieces:**
- Use Unicode chess symbols (♔♕♖♗♘♙ for white, ♚♛♜♝♞♟ for black)
- Large font size (text-5xl to text-6xl depending on square size)
- Smooth cursor: grab when hovering, grabbing when dragging
- Transition: transform 200ms ease for smooth movement
- Drop shadow on active/dragging piece

**Move Indicators:**
- Legal moves: Small circles (w-3 h-3) with forest green fill, 40% opacity
- Capture moves: Ring outline around target square
- Selected piece: Golden yellow glow/highlight on square
- Last move: Subtle cream overlay on source and destination squares

**Game Status Panel:**
- Position: Top of board or side panel
- Current turn indicator: "White to move" / "Black to move" with player color dot
- Game state messages: "Check!", "Checkmate - White Wins!", etc.
- Font: text-xl, font-semibold, centered
- Background: White card with subtle shadow

**Move History:**
- Scrollable list on right side (desktop) or below board (mobile)
- Algebraic notation format: "1. e4 e5 2. Nf3 Nc6"
- Alternating row colors for readability
- Current move highlighted with accent color
- Max height with overflow-y-auto

**Captured Pieces Display:**
- Horizontal row above/below board
- Small piece icons (text-2xl)
- Grouped by color with subtle background
- Material advantage counter (+2, -1, etc.)

**Action Buttons:**
- Primary CTA (New Game): bg-blue accent, white text, px-6 py-3, rounded-lg
- Secondary actions (Undo, Settings): outline variant with forest green border
- Hover states: Slight brightness increase, scale-105 transform
- Active state: scale-95 for tactile feedback

**Pawn Promotion Modal:**
- Centered overlay with backdrop blur
- 4-option grid: Queen, Rook, Bishop, Knight
- Large piece icons (text-6xl) on hover-scaled cards
- Modal background: white with shadow-2xl
- Close on selection

### E. Interaction Patterns

**Drag and Drop:**
- Piece becomes semi-transparent (opacity-80) when dragged
- Legal move squares show green dots immediately on piece pickup
- Smooth return animation if dropped on illegal square
- Snap to center of target square on valid drop

**Responsive Behavior:**
- Desktop (1024px+): Board centered, move history sidebar, captured pieces on sides
- Tablet (768px-1023px): Board centered, panels stack below
- Mobile (<768px): Full-width board (with horizontal scroll if needed), vertical stack

**Animations:**
- Piece movement: 300ms ease-in-out when moving programmatically
- Check indicator: Subtle pulse animation on king square
- Game end: Confetti or celebration animation for checkmate
- Minimal, purposeful animations - no distracting effects

## Images

No hero images or decorative imagery. This is a utility-focused chess application where the interactive chessboard is the central visual element. All graphics are functional Unicode chess pieces and UI elements.
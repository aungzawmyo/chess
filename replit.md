# Chess Game Application

## Overview

An interactive chess game web application built with React, TypeScript, and Express. The application provides a complete chess experience with full rules enforcement, including special moves like castling, en passant, and pawn promotion. The interface is inspired by leading chess platforms (Chess.com and Lichess), emphasizing clean design and gameplay clarity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (single-page application)

**UI Component System**
- **Shadcn/ui** component library (New York style variant) built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- Component structure follows atomic design principles with dedicated UI components in `client/src/components/ui/`

**State Management**
- **TanStack Query (React Query)** for server state management and data fetching
- Local React state (useState) for game state management
- Chess.js library handles game logic, move validation, and board state

**Design System**
- Custom color palette with forest green primary (#769556), cream secondary, and brown/beige board colors
- Typography using Roboto (primary) and Open Sans (secondary) font families
- Consistent spacing scale based on Tailwind's spacing units (2, 4, 8, 12, 16)
- Design guidelines reference Chess.com and Lichess for optimal piece visibility

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with ESM module syntax
- Middleware for JSON parsing, URL encoding, and request logging
- Custom logging with timestamp formatting for API requests

**Development & Production Split**
- Development mode uses Vite middleware for HMR and SSR
- Production mode serves static built assets
- Separate build outputs: frontend to `dist/public`, backend to `dist/`

**Storage Layer**
- **In-memory storage** (MemStorage) currently implemented for user data
- Interface-based design (IStorage) allows easy swapping to database-backed storage
- User schema defined with Drizzle ORM for future PostgreSQL integration

### Data Storage Solutions

**Database Configuration**
- **Drizzle ORM** configured for PostgreSQL (currently not connected to database)
- Schema definition in `shared/schema.ts` with user table structure
- Neon serverless driver configured for database connectivity
- Migration system configured via `drizzle.config.ts`

**Current State**
- Application runs with in-memory storage without database dependency
- Users table schema ready for PostgreSQL deployment
- Zod validation schemas for type-safe data insertion

### Authentication & Authorization

**Current Implementation**
- User schema includes username and password fields
- No active authentication flow implemented
- Storage interface supports user creation and retrieval by ID/username
- Ready for session-based or JWT authentication integration

### External Dependencies

**Core Libraries**
- **chess.js (v1.4.0)**: Complete chess move validation and game logic
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **drizzle-orm**: TypeScript ORM for SQL databases
- **@tanstack/react-query**: Asynchronous state management

**UI Component Libraries**
- **@radix-ui/***: Accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- **lucide-react**: Icon library
- **class-variance-authority**: Type-safe variant styling for components
- **tailwind-merge & clsx**: Utility for merging Tailwind classes

**Development Tools**
- **TypeScript**: Strict type checking with ESNext modules
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds
- **@vitejs/plugin-react**: React support for Vite

**Replit-Specific Integrations**
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code navigation features
- **@replit/vite-plugin-dev-banner**: Development environment indicator

**Session & Form Management**
- **connect-pg-simple**: PostgreSQL session store (configured but not active)
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation with Zod integration
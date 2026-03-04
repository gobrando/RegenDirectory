# RegenDirectory - Regenerative Products Marketplace

## Overview

RegenDirectory is a full-stack web application that connects conscious consumers with regenerative organic products. It's built as a marketplace directory where users can discover verified regenerative products, filter by categories and certifications, and learn about regenerative agriculture practices. The platform also provides a vendor application system for businesses to list their products and a live News feed pulling regenerative agriculture articles from RSS sources.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server code:

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter (lightweight React router)
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom regenerative-themed design tokens
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon (serverless PostgreSQL)
- **API Design**: RESTful JSON API

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon
- **ORM**: Drizzle with type-safe schema definitions
- **Migrations**: Drizzle Kit for database schema management
- **Development Storage**: In-memory storage implementation for development/testing

## Key Components

### Database Schema
The application uses three main entities:
- **Vendors**: Companies that produce regenerative products
- **Categories**: Product categorization (Food & Beverages, Personal Care, etc.)
- **Products**: Individual items with pricing, certifications, and vendor relationships

### Authentication & Authorization
Currently uses a simple session-based approach with express-session and PostgreSQL session storage via connect-pg-simple.

### UI Components
- Comprehensive component library using shadcn/ui
- Custom themed components for regenerative marketplace aesthetics
- Responsive design with mobile-first approach
- Accessibility-focused components using Radix UI primitives

### API Endpoints
- `GET /api/products` - Product listing with filtering capabilities
- `GET /api/products/:id` - Individual product details
- `POST /api/products` - Create new products
- `GET /api/vendors` - Vendor listing
- `POST /api/vendors` - Vendor application submission
- `GET /api/categories` - Product categories

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from REST endpoints
2. **API Layer**: Express routes handle HTTP requests and validate input using Zod schemas
3. **Storage Layer**: Storage interface abstracts database operations, with both memory and PostgreSQL implementations
4. **Database**: Drizzle ORM manages PostgreSQL interactions with type safety

## External Dependencies

### Core Framework Dependencies
- React 18 with TypeScript
- Vite for development and bundling
- Express.js for server framework

### UI & Styling
- Tailwind CSS for styling
- Radix UI primitives for accessible components
- Lucide React for icons
- FontAwesome (referenced in components)

### Database & Validation
- Drizzle ORM for database management
- Zod for schema validation
- @neondatabase/serverless for database connectivity

### Development Tools
- ESBuild for server-side bundling
- TypeScript for type safety
- Replit-specific development tools and error handling

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- Node.js with tsx for TypeScript execution
- In-memory storage for rapid development
- Replit-specific development tools integration

### Production Build
- Vite builds optimized client bundle to `dist/public`
- ESBuild bundles server code to `dist/index.js`
- Static file serving for production assets
- PostgreSQL database for production data persistence

### Environment Configuration
- Database URL configuration via environment variables
- Separate development and production database instances
- Session secret and other sensitive configuration via environment variables

The application is designed to be deployed on Replit with seamless development-to-production workflows, leveraging Neon's serverless PostgreSQL for scalable data storage.
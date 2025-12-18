# DeepWell Waitlist Dashboard

A modern, responsive dashboard for managing waitlist signups, built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Features

- 📊 **Statistics Dashboard**: View key metrics including total signups, tier breakdowns, and recent activity
- 🔍 **Advanced Filtering**: Filter by tier, current app, country, research follow-up status, and date ranges
- 🔎 **Search**: Quick email search with debounced input
- 📋 **Sortable Table**: Sort by email, tier, or created date
- 📄 **Pagination**: Configurable page sizes (10, 25, 50, 100)
- 👤 **User Details**: View complete user information in a modal
- 📥 **Export**: Export filtered data as CSV or JSON
- 🎨 **Modern UI**: Clean, accessible design matching DeepWell brand guidelines

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: MySQL (via Prisma)
- **ORM**: Prisma 7
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components built with Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn
- MySQL database

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="mysql://user:password@host:port/database"
```

3. Generate Prisma Client:

```bash
npx prisma generate
```

4. Run database migrations (if needed):

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser. You'll be automatically redirected to `/dashboard`.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── dashboard/
│   │       ├── waitlist/
│   │       │   ├── route.ts           # GET waitlist entries with filters
│   │       │   └── [id]/
│   │       │       └── route.ts       # GET single waitlist entry
│   │       └── export/
│   │           └── route.ts           # POST export data
│   ├── dashboard/
│   │   ├── page.tsx                   # Main dashboard page
│   │   ├── loading.tsx                # Loading state
│   │   └── error.tsx                  # Error boundary
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Home page (redirects to dashboard)
├── components/
│   ├── dashboard/
│   │   ├── DashboardHeader.tsx        # Page header
│   │   ├── StatsCards.tsx             # Statistics cards
│   │   ├── FiltersBar.tsx             # Filters and search
│   │   ├── WaitlistTable.tsx          # Data table
│   │   ├── UserDetailModal.tsx        # User details modal
│   │   ├── ExportButton.tsx           # Export functionality
│   │   ├── FilterChip.tsx             # Filter tags
│   │   └── EmptyState.tsx             # Empty states
│   └── ui/                            # Base UI components
├── lib/
│   ├── prisma.ts                      # Prisma client instance
│   ├── utils.ts                       # Utility functions
│   └── dashboard/
│       ├── formatEnums.ts             # Enum formatting utilities
│       └── formatDates.ts             # Date formatting utilities
└── prisma/
    └── schema.prisma                  # Prisma schema
```

## Design System

The dashboard follows the DeepWell design system with:

- **Primary Color**: `#00674F` (Primary Green)
- **Secondary Color**: `#008B66` (Secondary Green)
- **Font**: Bricolage Grotesque (via Google Fonts)
- **Spacing**: Consistent spacing using Tailwind utilities
- **Components**: Custom components matching design specifications

## API Routes

### GET `/api/dashboard/waitlist`

Fetch waitlist entries with filtering, sorting, and pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 25)
- `sortBy`: Column to sort by (default: "createdAt")
- `sortOrder`: "asc" | "desc" (default: "desc")
- `search`: Email search term
- `tier`: Filter by tier (1, 2, 3)
- `currentApp`: Filter by current app
- `sendToCountry`: Filter by country
- `researchFollowUp`: Filter by research follow-up status
- `dateFrom`: Start date (YYYY-MM-DD)
- `dateTo`: End date (YYYY-MM-DD)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 1234,
    "totalPages": 50
  },
  "stats": {
    "total": 1234,
    "tier1": 250,
    "tier2": 500,
    "tier3": 484,
    "researchInterested": 456,
    "recent24h": 12
  }
}
```

### GET `/api/dashboard/waitlist/[id]`

Fetch a single waitlist entry by ID.

### POST `/api/dashboard/export`

Export filtered data.

**Body:**
```json
{
  "format": "csv" | "json",
  "filters": { ... }
}
```

## Development

### Running in Development

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

### Database Management

```bash
# Generate Prisma Client
npx prisma generate

# Create a migration
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio
```

## License

Private - DeepWell

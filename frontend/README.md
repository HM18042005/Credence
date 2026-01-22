# Frontend - Consent-Driven Credit Intelligence Platform

A production-ready Next.js frontend for the credit intelligence platform with separate dashboards for borrowers and lenders.

## Features

### Borrower Dashboard
- Financial snapshot and metrics visualization
- Credit score gauge with risk assessment
- Explainable AI - positive and risk factors
- Credit decision cards
- Real-time credit assessment

### Lender Dashboard
- Portfolio overview with analytics
- Borrower list with filtering
- Risk distribution charts
- Decision statistics
- Detailed borrower profiles

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4 with custom dark theme
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **TypeScript**: Full type safety

## Setup

### Prerequisites
- Node.js 18+
- Backend API running (see backend README)

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment:
\`\`\`bash
cp .env.local.example .env.local
# Edit .env.local with your API URL
\`\`\`

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
frontend/
├── app/
│   ├── borrower/dashboard/    # Borrower portal
│   ├── lender/dashboard/      # Lender portal
│   ├── globals.css            # Global styles with dark theme
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── borrower/              # Borrower-specific components
│   ├── lender/                # Lender-specific components
│   ├── layout/                # Layout components (Sidebar, Header)
│   └── shared/                # Shared UI components
├── lib/
│   ├── api-config.ts          # API endpoints configuration
│   └── types.ts               # TypeScript types
└── utils/
    └── formatters.ts          # Utility functions
\`\`\`

## Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

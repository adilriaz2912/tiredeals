# TireDeals CRM

Advanced Customer Relationship Management system built specifically for TireDeals online tire retail business.

## Features

### Core CRM
- **Customer Management** - Complete customer profiles with contact info, addresses, vehicle garage, purchase history, and communication logs
- **Order & Shipping Management** - Full order lifecycle with multi-carrier tracking (FedEx, UPS, USPS), real-time status updates, and delivery confirmation
- **Local Installer Network** - Geo-searchable installer database with bulk email capabilities, partnership tracking, commission management, and ratings

### Additional Features
- **Inventory Management** - Real-time stock tracking, low stock alerts, reorder points, and inventory adjustments
- **Support Ticketing** - Full ticket lifecycle with priority management, agent assignment, and SLA tracking
- **Warranty Tracker** - Mileage and road hazard warranty management with claim processing
- **Loyalty Program** - Points-based system with tier management (Bronze, Silver, Gold, Platinum), rewards catalog, and transaction history
- **Abandoned Cart Recovery** - Automated email/SMS sequences with discount code generation and recovery tracking
- **SMS Notifications** - Twilio-powered SMS with templates, bulk messaging, and delivery tracking
- **Reporting Dashboard** - Revenue analytics, customer metrics, product performance, and installer rankings

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom brand theme (Black, Green, White)
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand, React Query
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **SMS**: Twilio
- **Email**: SendGrid/Nodemailer

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
```bash
cd tiredeals/crm
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database
```bash
npm run db:push
npm run db:seed  # Optional: seed with sample data
```

5. Start the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
crm/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── customers/     # Customer management
│   │   ├── orders/        # Order management
│   │   ├── shipping/      # Shipping & tracking
│   │   ├── installers/    # Installer network
│   │   ├── inventory/     # Inventory management
│   │   ├── support/       # Support tickets
│   │   ├── warranties/    # Warranty tracker
│   │   ├── loyalty/       # Loyalty program
│   │   ├── abandoned-carts/  # Cart recovery
│   │   ├── notifications/ # SMS & notifications
│   │   └── reports/       # Analytics dashboard
│   ├── components/        # Reusable UI components
│   │   └── layout/        # Layout components (Sidebar, Header)
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── tailwind.config.js     # Tailwind configuration
```

## Database Schema

The CRM includes 25+ database models including:
- Users & Authentication
- Customers, Addresses, Vehicles
- Tires, Brands, Categories
- Orders, Order Items, Shipments
- Installers, Reviews
- Warranties, Claims
- Support Tickets, Comments
- Loyalty Transactions, Rewards
- Abandoned Carts
- Communications (Email/SMS)
- Activity Logs, Notifications

## Brand Colors

- **Primary Green**: `#10b981`
- **Black**: `#000000`
- **White**: `#ffffff`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database

## License

Private - TireDeals Internal Use Only

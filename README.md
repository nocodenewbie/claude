# ProfitMax AI® - B2B Sales Virtual Assistant Platform

Transform your website into a 24/7 automated B2B sales channel with **Max**, your intelligent virtual sales assistant.

## 🚀 Features

- 🤖 **Virtual Sales Assistant** - Max simulates the best human sales representative
- 💰 **Dynamic Negotiation** - Total control over margins and offered discounts
- 📊 **Admin Dashboard** - Manage products, quotes, and negotiation rules
- 📈 **Analytics** - Track sales performance and conversion rates
- 🔌 **Easy Integration** - Simple widget embed code for your website
- 🌐 **Multi-Industry** - Supports Food, Construction, Auto Parts, Electronics, and more

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Clerk account (for authentication)
- Anthropic API key (for Max's AI brain)
- Resend account (for email delivery)

## 🛠️ Setup Instructions

### 1. Clone and Install

\`\`\`bash
git clone <your-repo>
cd profitmax-ai
npm install
\`\`\`

### 2. Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`bash
cp .env.example .env
\`\`\`

Update the following variables:

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/profitmax?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Anthropic AI
ANTHROPIC_API_KEY=your_anthropic_api_key

# Resend Email
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@profitmaxai.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 3. Database Setup

\`\`\`bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio to view data
npm run db:studio
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

\`\`\`
profitmax-ai/
├── app/
│   ├── admin/               # Admin dashboard pages
│   │   ├── products/       # Product management
│   │   ├── rules/          # Negotiation rules
│   │   ├── quotes/         # Quote inbox
│   │   └── widget/         # Widget settings
│   ├── api/                # API routes
│   ├── widget/             # Max widget embed
│   └── sign-in/            # Authentication
├── components/             # React components
├── lib/
│   ├── db/                 # Database client
│   └── utils/              # Utility functions
├── prisma/
│   └── schema.prisma       # Database schema
└── public/                 # Static assets
\`\`\`

## 🎯 Getting Started

### Step 1: Upload Your Product Catalog

1. Go to **Admin Dashboard** → **Produtos**
2. Download the CSV template
3. Fill in your products (name, price, category, etc.)
4. Upload the CSV file

### Step 2: Configure Negotiation Rules

1. Go to **Regras de Negociação**
2. Set minimum margins and discount ranges
3. Configure rules by volume, category, or client

### Step 3: Install the Widget

1. Go to **Widget**
2. Customize Max's appearance and personality
3. Copy the embed code
4. Paste it into your website's HTML

## 🧪 Testing Max

Visit the widget demo page at `/widget` to interact with Max and test the conversation flow.

## 📊 Database Schema

- **User** - Customer accounts (managed by Clerk)
- **Product** - Product catalog with pricing
- **NegotiationRule** - Discount and margin rules
- **Quote** - Customer orders/requests
- **QuoteItem** - Individual items in quotes
- **WidgetSettings** - Widget customization

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: Clerk
- **AI**: Anthropic Claude API
- **Email**: Resend
- **Deployment**: Vercel (recommended)

## 📝 Development Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
\`\`\`

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

\`\`\`bash
vercel deploy
\`\`\`

## 📞 Support

For issues and questions, please open an issue on GitHub.

## 📄 License

ISC License

---

**ProfitMax AI®** - Maximizing B2B Sales with Intelligent Automation

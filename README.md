# ChainIP — NFT-Based Digital Intellectual Property Protection System

> Full-stack implementation of the research paper:
> **"NFT-Based Digital Intellectual Property Protection System"** — Chandigarh University

---

## Tech Stack
- **Next.js 15** (App Router, TypeScript)
- **TanStack Query v5** — data fetching & caching
- **Axios** — HTTP client
- **Prisma ORM** — MongoDB adapter
- **MongoDB** — database
- **Tailwind CSS** + Custom CSS

## Features Implemented
- Content fingerprinting (SHA-256 + perceptual hash)
- NFT minting with on-chain metadata (ERC-721/ERC-1155)
- Hybrid on-chain/off-chain storage (IPFS + MongoDB)
- Smart contract licensing (exclusive, non-exclusive, time-bound, use-based)
- Automated royalty distribution
- AI-assisted multimodal infringement detection
- Blockchain-linked legal evidence generation

## Getting Started

```bash
npm install
cp .env.example .env.local
# fill in DATABASE_URL with your MongoDB Atlas connection string
npx prisma generate
npx prisma db push
npm run dev
```

## Project Structure

```
app/api/          - REST API routes (assets, licenses, infringements, dashboard)
components/       - Sidebar + 5 page components
hooks/use-api.ts  - TanStack Query hooks
lib/api-client.ts - Axios client
lib/db.ts         - In-memory store (dev) — swap with prisma for production
lib/prisma.ts     - Prisma singleton
providers/        - QueryProvider wrapper
prisma/schema     - MongoDB schema (Asset, License, Infringement, User)
```

## Switching to Real MongoDB
1. Set DATABASE_URL in .env.local
2. Run: npx prisma generate && npx prisma db push
3. In API routes, replace `assetDb.*` imports with `prisma.asset.*`

## Performance (from paper)
- NFT Minting: avg 11.2s
- Gas Cost (mint): avg 0.0034 ETH
- Infringement Detection Accuracy: **91.3%**

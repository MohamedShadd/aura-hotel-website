This is a hotel website example, made using nextjs, supabase, stripe, shadcn/ui and tailwind.

## Getting Started

First, fill in the required fields in the example.env and rename it to .env.local:

```bash
# PRIVATE VARIABLES

SUPABASE_URL=
SUPABASE_KEY=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# PUBLIC VARIABLES

NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
```

then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

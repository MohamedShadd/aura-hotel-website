This is a hotel website example, made using nextjs, typescript, supabase, stripe, shadcn/ui and tailwind. You can check out [the live demo here](https://aura.nebuladev.cc)

## Getting Started

First, fill in the required fields in the example.env and rename it to .env.local:

```bash
# PRIVATE VARIABLES

SUPABASE_URL=
SUPABASE_KEY=

NEXTAUTH_URL= eg. http://localhost:3000
NEXTAUTH_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# PUBLIC VARIABLES

NEXT_PUBLIC_SERVER_URL= eg. http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
```

Secondly, you need to create a [supabase](https://supabase.com/) database and create the following tables:

Bookings:

| Name         | Format                      | Type    |
| ------------ | --------------------------- | ------- |
| id           | bigint                      | number  |
| created_at   | timestamp with time zone    | string  |
| startDate    | timestamp without time zone | string  |
| endDate      | timestamp without time zone | string  |
| numNights    | smallint                    | number  |
| numGuests    | smallint                    | number  |
| cabinPrice   | real                        | number  |
| extrasPrice  | real                        | number  |
| totalPrice   | real                        | number  |
| status       | text                        | string  |
| hasBreakfast | boolean                     | boolean |
| isPaid       | boolean                     | boolean |
| observations | text                        | string  |
| cabinId      | bigint                      | number  |
| guestId      | bigint                      | number  |
| paymentId    | text                        | string  |

cabins:

| Name         | Format                   | Type   |
| ------------ | ------------------------ | ------ |
| id           | bigint                   | number |
| created_at   | timestamp with time zone | string |
| name         | text                     | string |
| maxCapacity  | smallint                 | number |
| regularPrice | smallint                 | number |
| discount     | smallint                 | number |
| description  | text                     | string |
| image        | text                     | string |

Guests:

| Name        | Format                   | Type   |
| ----------- | ------------------------ | ------ |
| id          | bigint                   | number |
| created_at  | timestamp with time zone | string |
| fullName    | text                     | string |
| email       | text                     | string |
| nationalID  | text                     | string |
| nationality | text                     | string |
| countryFlag | text                     | string |
| image       | text                     | string |

Settings:

| Name                | Format                   | Type   |
| ------------------- | ------------------------ | ------ |
| id                  | bigint                   | number |
| created_at          | timestamp with time zone | string |
| minBookingLength    | smallint                 | number |
| maxBookingLength    | smallint                 | number |
| maxGuestsPerBooking | smallint                 | number |
| breakfastPrice      | real                     | number |

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

##### Built on [Jonas Schmedtmann's React Udemy Course](https://www.udemy.com/course/the-ultimate-react-course)

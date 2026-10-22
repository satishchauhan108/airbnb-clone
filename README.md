# Airbnb Clone

An Airbnb-inspired property discovery and booking app built with Next.js. Browse
property details and photos, search and filter listings, and use the account,
favorites, trips, reservations, and host listing flows.

## Features

- Responsive property browsing and listing detail pages
- Search and filters for location, category, and price
- Email/password authentication, with optional Google sign-in
- Favorites, reservations, trips, and property management
- Cloudinary image uploads for host-created listings
- Read-only demo listings for running the browsing experience without a database

## Tech stack

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS
- Better Auth
- Prisma ORM and PostgreSQL
- Cloudinary for listing image uploads

## Getting started

### Requirements

- Node.js 20.9 or later
- pnpm 9.15.9

### Install dependencies

```sh
pnpm install
```

### Configure environment variables

Copy `.env.example` to `.env` and update the values for the features you want to
use. In PowerShell:

```powershell
Copy-Item .env.example .env
```

The example configuration enables demo mode:

```env
DEMO_MODE=true
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
```

With `DEMO_MODE=true`, you can run the app and browse demo listings without
configuring PostgreSQL. Demo mode is intended for browsing; database-backed
features such as creating listings and managing reservations require a
PostgreSQL database.

For full functionality:

1. Create a PostgreSQL database and set `DATABASE_URL` in `.env`.
2. Set `DEMO_MODE=false`.
3. Set `BETTER_AUTH_SECRET` to a long, random secret.
4. To create the database tables from the Prisma schema, run:

   ```sh
   pnpm exec prisma db push
   ```

5. For Google sign-in, set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
6. For host listing image uploads, set `CLOUDINARY_CLOUD_NAME`,
   `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

Google sign-in and Cloudinary uploads are optional unless you need those
features. Do not commit your `.env` file or real credentials.

### Run locally

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Generate the Prisma client and build the app |
| `pnpm start` | Start the production server (after `pnpm build`) |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run the TypeScript type checker |
| `pnpm prisma:generate` | Generate the Prisma client |
| `pnpm prisma:validate` | Validate the Prisma schema |


# Project Context

## What this project does

Apexbit Cargo is a parcel-tracking and logistics-management web application. Visitors can look up a shipment by tracking code and see its status, routing details, package items, and tracking-event history. Staff can sign in to an admin area to register shipments, log tracking checkpoints, and view/filter the parcel list.

The application is built with the Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. It is configured for deployment on Vercel.

## How the application fits together

1. `app/` defines the App Router pages and API route.
2. `components/` contains the page-level experiences and shared presentation components.
3. Client components call server actions in `app/actions/` for database-backed operations.
4. Server actions use the Prisma client exported from `lib/db.ts`; the client connects to PostgreSQL using `DATABASE_URL`.
5. `prisma/schema.prisma` defines the current database models and parcel-status enum. Prisma migrations are in `prisma/migrations/`.
6. `middleware.ts` applies the `admin_token` JWT gate to `/arc` routes, allowing the login and registration pages through.

The root layout in `app/layout.tsx` wraps every route with the public navbar, the `ParcelsProvider`, cookie banner, optional production Vercel Analytics, and footer. The provider in `lib/data-context.tsx` contains mock in-memory data; the current tracking and admin experiences instead use server actions and the database.

## Route map

| Route | Purpose |
|---|---|
| `/` | Marketing landing page with a link to shipment tracking and industry imagery. |
| `/tracking` | Public tracking search and shipment details/timeline. |
| `/about` | Company and product overview. |
| `/security` | Security and infrastructure information page. |
| `/privacy`, `/terms`, `/cookies` | Static policy and legal-information pages. |
| `/arc/login` | Admin sign-in. |
| `/arc/register` | Admin account registration. |
| `/arc` | Admin parcel dashboard with search, status filtering, and summary counts. |
| `/arc/create` | Admin form for creating a parcel and generating a tracking code. |
| `/arc/update` | Admin form for adding a status event to a parcel. |
| `/arc/edit-code` | Custom tracking-code parcel registration. Despite the route name, this page creates a parcel; it does not edit an existing parcel's code. |
| `/api/cron/ping` | Lightweight database ping endpoint used by the Vercel cron configuration. |

## Main data and workflows

### Parcel tracking

`components/public-tracking-page.tsx` normalizes the entered tracking code to uppercase by default (with an optional case-sensitive mode), then calls `getParcelTracking` in `app/actions/parcel-actions.ts`. The action looks up a parcel by its unique `trackingCode`, including its `packages` and newest-first `events`. The component displays the parcel's current status, route, dates, package totals, and `Timeline`.

### Admin parcel management

- `components/admin-dashboard.tsx` loads parcels through `getAllParcels`, then calculates counts and filters the list client-side.
- `components/admin-parcel-creation.tsx` submits sender, receiver, logistics, and package data to `createParcel`. The action generates an `APEX-...` code, creates package rows, sets the initial status to `LABEL_CREATED`, and creates the initial tracking event.
- `components/admin-status-update.tsx` submits a parcel, status, location, message, and optional delivery estimate to `addTrackingEvent`. The action updates the parcel's current status and appends a tracking event.
- `components/` also contains the custom-code creation form, status badge, timeline, shared navigation, site chrome, and a reusable UI button.

### Admin authentication

`app/actions/auth-actions.ts` stores admin credentials in the `Admin` table, hashes passwords with `bcryptjs`, and signs a 24-hour JWT using `jose`. Successful login sets an HTTP-only `admin_token` cookie. `middleware.ts` verifies the JWT for `/arc` pages and redirects unauthenticated visitors to `/arc/login`.

### Database model

`prisma/schema.prisma` currently defines:

- `Admin`: admin identity and password hash.
- `User`: an additional user model; it is not used by the current admin login flow.
- `Parcel`: unique tracking code, sender/receiver details, origin/destination, current status, dispatch information, and dates.
- `PackageItem`: item name, weight, and quantity, related to a parcel.
- `TrackingEvent`: status, location, message, and timestamp, related to a parcel.
- `ParcelStatus`: `LABEL_CREATED`, `IN_TRANSIT`, `OUT_FOR_DELIVERY`, `DELIVERED`, `HELD_AT_CUSTOMS`, and `EXCEPTION`.

Deleting a parcel cascades to its package items and tracking events.

## Repository map

```text
app/
  actions/                 Server actions for admin authentication and parcel operations
  api/cron/ping/            Cron-triggered database health ping
  arc/                      Admin login, registration, dashboard, and shipment workflows
  about/                    Company/product information page
  cookies/ privacy/ terms/  Static policy pages
  security/                 Security information page
  tracking/                 Public tracking route
  globals.css               Tailwind imports, theme tokens, and base styles
  layout.tsx                Global metadata, fonts, and shared layout
  page.tsx                  Marketing landing page
components/
  ui/                       Reusable UI primitives
  ...                       Tracking, dashboard, forms, timeline, status, and site chrome
exports/index.js            Named exports for industry image assets
images/                     Industry images used by the landing page
lib/
  db.ts                     Prisma client and PostgreSQL adapter/pool
  data-context.tsx          Legacy/mock client-side parcel context
  types.ts                  Types for the mock parcel context
  utils.ts                  Tailwind class-name merge helper (`cn`)
prisma/
  schema.prisma             Current Prisma data model
  migrations/               SQL migration history
public/                     Icons, logos, and placeholder assets
middleware.ts               JWT gate for `/arc` routes
prisma.config.ts            Prisma CLI datasource URL configuration
next.config.mjs             Next.js build and image settings
vercel.json                 Scheduled cron configuration
package.json                Scripts and dependencies
```

Other root files configure TypeScript (`tsconfig.json`), PostCSS (`postcss.config.mjs`), and the shadcn component generator (`components.json`). `package-lock.json` is the npm lockfile.

## Development and deployment

- Install dependencies: `npm install`
- Run the development server: `npm run dev`
- Build for production: `npm run build` (runs `prisma generate` before `next build`)
- Start the production server: `npm run start`
- Lint: `npm run lint`

No test script or test files are currently defined in `package.json`/the tracked project files.

Set these environment variables for a deployed environment:

| Variable | Used for |
|---|---|
| `DATABASE_URL` | PostgreSQL connection used by the application Prisma client. |
| `DIRECT_URL` | Direct database URL read by `prisma.config.ts` for Prisma CLI operations. |
| `JWT_SECRET` | Signing and verifying the admin session JWT. |
| `CRON_SECRET` | Optional authorization value for the cron ping endpoint. |

`vercel.json` schedules `/api/cron/ping` at `0 12 */3 * *` (noon every third day, according to the deployment platform's cron timezone).

## Notes for future changes

- Keep the Prisma schema, migrations, and generated Prisma client aligned. The checked-in initial SQL migration appears older than the current schema: it does not include the current `Admin`/`PackageItem` models or all current parcel fields. Review the migration history before relying on a fresh database migration.
- The admin page gate is implemented in middleware. When adding server actions or other entry points for admin operations, verify that the operation itself has the required authorization rather than relying only on the UI route being protected.
- Set `JWT_SECRET` consistently in every environment. The login action has a development fallback while middleware verification reads the environment variable directly.
- `next.config.mjs` currently sets `typescript.ignoreBuildErrors` to `true`; do not assume a successful production build proves TypeScript is error-free.
- Legal and security pages are static content. Treat their claims as product copy, not as a guarantee that a corresponding technical control exists in the implementation.

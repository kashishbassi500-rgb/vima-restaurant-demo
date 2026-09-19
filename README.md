# VIMA Restaurant Website — Demo

A responsive React + Vite + TypeScript website concept for VIMA, an Indian restaurant demo in Sikar, Rajasthan.

## Demo safeguards

- Business address, phone, hours, delivery/takeaway, dishes, and prices are sample details supplied for this demonstration, not independently verified.
- Menu prices are illustrative and centralized in `src/data/menu.ts`.
- Review cards are fictional layout examples, not real customer testimonials or Google reviews.
- Google Maps uses a search query, not a verified business listing.
- Cart, checkout, order status, payment outcome, and reservation request are frontend-only simulations.
- The payment flow never collects card information and does not connect to a payment processor.
- WhatsApp actions open a prefilled message only after a click. Sending it does not confirm an order or reservation.
- Remote image URLs are illustrative imagery. Replace with generated, optimized, licensed assets before production.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Customize business data

- `src/data/restaurant.ts`: address, phone, hours, map destination, service toggles.
- `src/data/menu.ts`: sample dishes, categories, descriptions, prices, and image paths.
- `src/data/gallery.ts`: gallery image URLs and alt text.
- `src/utils/whatsapp.ts`: WhatsApp message templates.
- `src/index.css`: brand palette, typography, layouts, and responsive styles.
- `index.html`: title, description, Open Graph tags, structured data.

## Images

This starter references illustrative remote food/interior imagery to make the demo render immediately. To use locally generated AI images, save optimized WebP/AVIF files under `public/images/` and update image URLs in `src/data/menu.ts`, `src/data/gallery.ts`, and the hero/intro/order image references in `src/App.tsx` and `src/index.css`.

Suggested consistent image prompt:
> Editorial food photography for a premium Indian restaurant website inspired by Rajasthan, warm natural window light, deep maroon and antique gold accents, handmade ceramic/brass serveware, appetizing authentic Indian food, tasteful traditional architectural details, realistic texture, elegant composition, no text, no logo, no watermark.

Suggested assets:
- `hero-restaurant.webp`: wide 16:9 restaurant dining room with arch details.
- `restaurant-interior.webp`: vertical welcoming dining room.
- Dish images: square, one dish per frame, consistent warm lighting.
- Gallery: mix of interior, table setting, breads, curry, biryani, dessert.

## Payments: safe path to a real integration

The current payment selector is mock-only and cannot charge money. For a real integration:
1. Add a Node.js API (Express/Fastify) and persistent database (PostgreSQL recommended).
2. Create a server endpoint that validates cart item IDs and prices from trusted server-side menu data.
3. Create a payment intent/session on the server using a provider's test credentials stored only in server environment variables.
4. Confirm payment status server-side through signed provider webhooks before marking an order paid.
5. Store only necessary order metadata. Never collect raw card details in a custom form.
6. Start with sandbox/test mode; explicitly review provider requirements before enabling live mode.
7. Configure `.env` on the server; never expose secret keys through `VITE_*` variables.

`.env.example` documents placeholders. No credentials are required to run this frontend.

## Backend proposal

- **API:** Node.js + Express or Fastify, TypeScript, schema validation (Zod).
- **Database:** PostgreSQL with Prisma.
- **Tables:** MenuItem, Order, OrderLine, Reservation, PaymentEvent, BusinessSettings.
- **Security:** server-side price calculation, input validation, rate limiting, CSRF/origin strategy, secure secrets, logging without payment data, webhook signature validation.
- **Reservations:** store as `requested` until staff confirm; do not promise live availability without a real scheduling system.
- **Orders:** status transitions such as `draft → pending_payment → paid → accepted → preparing → fulfilled`; separate payment state from fulfillment state.

## Deployment

Deploy the Vite frontend to Vercel, Netlify, Cloudflare Pages, or any static hosting that supports SPA/static assets:
1. Push the project to a Git repository.
2. Import the repository in your host.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Configure the final production domain and update canonical/Open Graph URLs and `public/sitemap.xml`.
6. For real orders/payments/reservations, deploy the API separately and configure its server-side environment variables and database.
7. Verify every phone, address, map destination, menu item, price, opening schedule, service area, social account, and legal policy before launch.

## Testing checklist

- [x] Menu search and category filters, including empty state.
- [x] Add to cart, quantity increment/decrement, remove, subtotal and total.
- [x] Checkout validation, delivery address conditional field, order summary.
- [x] Mock payment modes selected as UI demonstration; no card data collected.
- [x] Reservation required fields and status disclaimer.
- [x] WhatsApp URLs use URL-encoded messages and require a user click.
- [x] Gallery opens a lightbox with next/previous and close.
- [x] Mobile navigation toggle and responsive CSS breakpoints.
- [x] Demo labels for review, location, menu, and simulated flows.
- [ ] Automated browser tests and real-device QA should be run before deployment.
- [ ] Live backend, real payment integration, live table availability, and confirmed order acceptance are not implemented.

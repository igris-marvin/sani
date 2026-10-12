# Sani Enterprise

Sani Enterprise is a furniture catalogue and storefront for customers and a
lightweight CMS for administrators. Customers can browse product categories,
manage their account, save items, and send order requests directly to the
business on WhatsApp. Administrators can review store metrics, manage products,
and view customer accounts.

## Technology

- React and TypeScript with Vite
- Tailwind CSS for utility-first layout and responsive styling
- Radix UI Themes for accessible interface controls
- Motion for React for restrained page and collection transitions
- Axios for API requests
- React Icons for interface iconography

## Development

```sh
npm install
npm run dev
```

During development, Vite proxies `/api` requests to the Spring Boot service at
`http://localhost:9090`. Start the backend separately when using account,
catalogue, cart, or administration features.

## Validation

```sh
npm run build
npm run lint
```

## Project structure

- `src/pages/store/` — home, catalogue, cart, wishlist, account, and information pages
- `src/pages/admin/` — dashboard, product management, and people management pages
- `src/components/` — shared layouts and UI primitives
- `src/assets/images/` — storefront and dashboard images
- `src/assets/styles/main.css` — Tailwind entry and small global form/base styles
- `src/api/client.ts` — shared Axios client and optional NDJSON `Flux` stream reader
- `src/api/auth.ts`, `catalog.ts`, `customer.ts`, `admin.ts` — typed endpoint modules
- `src/contexts/` and `src/providers/` — authentication context and provider
- `src/data/` and `src/types/` — shared category data and domain types

The frontend expects the backend endpoints used by the existing Sani Enterprise
API, including `/me`, `/shop/products`, `/user/cart`, `/user/account`,
`/admin/dashboard`, `/admin/products`, and `/admin/users`. Wishlist actions use
`/user/wishlist` and `/user/wishlist/{id}`.

The API modules use normal JSON requests for `Mono` responses and JSON arrays
for `Flux` responses. For a server endpoint that streams newline-delimited JSON,
use `streamJson<T>("/your/streaming/endpoint", abortSignal)` from
`src/api/client.ts`; the server should negotiate `application/x-ndjson`.

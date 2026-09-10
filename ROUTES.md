# Connected application routes

Run `npm start` in `javascript-basic-exercises` and `npm run dev` in `frontend`.

| Route | Behavior |
| --- | --- |
| `/` | Home, navigation, search, product and category links |
| `/products?q=...&category=...` | Search and category filters stored in the URL |
| `/products/:id` | Product details and add to cart |
| `/login`, `/register` | API authentication; preserves the destination through registration and login |
| `/cart` | Selected items, quantities, SAVE10 voucher and shipping estimate |
| `/checkout` | Requires login; validates shipping and saves an order through the API |
| `/account` | Requires login; loads current profile and saves changes |
| `/account/orders` | Requires login; shows the current user's saved orders |
| `/account/security` | Requires current password, updates password and signs out |
| `/wishlist` | Save/remove products; persists in this browser |
| `/contact` | Validates and saves contact requests |
| Other paths | 404 with a link home |

Checkout uses `POST /orders`; order history uses `GET /orders`. The server calculates prices, voucher discounts and shipping from its product catalog. Repeated submissions with the same request ID return the existing order. Only purchased items are removed from the frontend cart after success.

`GET /auth/me` reads the current database profile. `POST /auth/password` verifies the current password and revokes refresh tokens. Existing access tokens expire under the existing 60-second policy.

`POST /contacts` stores messages in `data/contacts.json`; it does not send email. Orders are stored in `data/orders.json`. Only cash on delivery is available; card and bank transfer options are disabled until payment integration exists.

Cart and wishlist remain local to this browser; they do not synchronize across devices. Existing `/carts` endpoints are not used by the frontend. JSON storage and the existing mock authentication remain intended for local development.

Validation: frontend `npm run lint`, `npm run build`; backend `npm test`. API tests use temporary copies of data and check authentication, profile ownership, order validation, price calculation, duplicate submission, per-user order history, contact validation and password changes. Browser testing requires an available browser connection.

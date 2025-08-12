# PalmTrade

Palm oil e-commerce and marketing platform with roles: Customer, Seller, Supplier.

## Stack
- Frontend: Angular 17 (standalone components, SCSS)
- Backend: Express.js, Sequelize, MySQL

## Development

Using Docker (recommended):

1. Create an `.env` in `backend` based on `.env.sample` if you need overrides.
2. Start services:

```bash
cd /workspace/palmtrade
docker compose up --build
```

- MySQL: `localhost:3306` (root/yourpassword)
- Backend API: `http://localhost:4000`
- Angular dev server: run separately:

```bash
cd frontend
npm start
```

Angular is configured with `proxy.conf.json` so `/api/*` is forwarded to `http://localhost:4000`.

## Seeding

After MySQL is up, seed the database:

```bash
cd backend
npm run seed
```

This creates sample users, products, reviews, testimonials, and lease options.

## Roles and Rules
- Seller listing requires at least 20 liters stock.
- Supplier has customer capabilities and partners directly with PalmTrade.
- JWT auth provided for protected endpoints.
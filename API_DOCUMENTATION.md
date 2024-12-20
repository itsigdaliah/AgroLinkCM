# AgroLink CM API Documentation

## Authentication
```http
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/verify
POST /api/auth/logout
```

## User Management
```http
GET /api/users/profile
PUT /api/users/profile
GET /api/users/transactions
PUT /api/users/settings
```

## Marketplace
```http
# Listings
GET /api/marketplace/listings
POST /api/marketplace/listings
GET /api/marketplace/listings/:id
PUT /api/marketplace/listings/:id
DELETE /api/marketplace/listings/:id

# Orders
POST /api/marketplace/orders
GET /api/marketplace/orders
GET /api/marketplace/orders/:id
PUT /api/marketplace/orders/:id

# Reviews
POST /api/marketplace/reviews
GET /api/marketplace/reviews/:listingId
```

## Advisory Services
```http
# General Advisory
GET /api/advisory/tips
POST /api/advisory/questions
GET /api/advisory/questions/:id
GET /api/advisory/experts

# Market Intelligence
GET /api/advisory/prices
GET /api/advisory/trends
GET /api/advisory/weather

# Chat Support
POST /api/advisory/chat
GET /api/advisory/chat/history
```

## Payments
```http
POST /api/payments/initiate
POST /api/payments/verify
GET /api/payments/history
```

## Analytics
```http
GET /api/analytics/sales
GET /api/analytics/performance
GET /api/analytics/market-trends
```
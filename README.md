# CRUD API with Swagger

A robust RESTful API built with Node.js, Express, and MongoDB. Features include User Authentication (JWT), CRUD operations, Swagger API documentation, and a database seeding mechanism.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Running locally or a MongoDB Atlas URI)

## Setup Instructions

### 1. Clone the repository & navigate to the folder:
```bash
cd Github-Action-Project
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Set up environment variables:
Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/node_crud_api
JWT_SECRET=super_secret_jwt_key_123
```

(Ensure your MongoDB server is running on the provided `MONGO_URI`)

### 4. Seed the database:
Populate your database with initial users and items.

```bash
npm run seed
```

### 5. Start the server:

**For development (with auto-restart):**
```bash
npm run dev
```

**For production:**
```bash
npm start
```

## API Documentation (Swagger)

Once the server is running, you can access the interactive Swagger UI documentation at:

http://localhost:3000/api-docs

### How to test protected routes in Swagger:

1. Use the `POST /api/auth/login` route with the seeded user credentials:
   - Email: admin@example.com
   - Password: 123456
2. Copy the token from the response.
3. Click the 🔒 Authorize button at the top right of the Swagger UI.
4. Enter the token in the format: `Bearer <your_token_here>` and click Authorize.
5. You can now test the Items CRUD endpoints.

## API Endpoints

### Auth
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and get JWT token

### Items (Protected)
- POST /api/items - Create an item
- GET /api/items - Get all items
- GET /api/items/:id - Get a single item
- PUT /api/items/:id - Update an item
- DELETE /api/items/:id - Delete an item

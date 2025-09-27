# NexusHub Backend

This is the backend API server for NexusHub, providing endpoints for real estate, e-commerce, networking, authentication, and AI chat functionality.

## Features

- **Authentication**: Google OAuth integration with JWT tokens
- **Real Estate**: Property listings, filtering, favorites
- **E-commerce**: Product catalog, cart management, search
- **Networking**: Social posts, connections, user interactions
- **AI Chat**: Integration with Sensay AI for intelligent responses

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Configure environment variables in `.env`

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /login` - Google OAuth login
- `GET /me` - Get current user
- `POST /refresh` - Refresh JWT token
- `POST /logout` - Logout

### Real Estate (`/api/real-estate`)
- `GET /` - Get properties (with filtering)
- `GET /:id` - Get single property
- `POST /favorites` - Add to favorites
- `GET /favorites/:userId` - Get user favorites
- `POST /` - Create property (admin)

### E-commerce (`/api/ecommerce`)
- `GET /` - Get products (with filtering)
- `GET /:id` - Get single product
- `POST /cart` - Add to cart
- `GET /cart/:userId` - Get cart items
- `PUT /cart/:cartItemId` - Update cart quantity
- `DELETE /cart/:cartItemId` - Remove from cart

### Networking (`/api/networking`)
- `GET /posts` - Get all posts
- `POST /posts` - Create post
- `POST /posts/:id/like` - Like post
- `GET /users` - Get all users
- `POST /connect` - Connect with user
- `GET /connections/:userId` - Get user connections

### AI Chat (`/api/chat`)
- `POST /` - Chat with AI
- `GET /history/:userId` - Get chat history
- `POST /save` - Save chat message

## Data Models

The backend uses in-memory data storage with the following models:
- User
- Property
- Product
- Post

In production, replace with a proper database (MongoDB, PostgreSQL, etc.).

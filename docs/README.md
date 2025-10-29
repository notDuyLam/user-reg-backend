# User Registration Backend API

A NestJS backend API for user registration with PostgreSQL database, featuring strict password validation, bcrypt password hashing, and CORS support for React frontend integration.

## Features

- **POST /user/register** - User registration endpoint
- **Strict Password Validation** - Minimum 8 characters, must include uppercase, lowercase, number, and special character
- **Password Hashing** - Using bcrypt with 12 salt rounds
- **Email Uniqueness** - Prevents duplicate email registrations
- **Error Handling** - Meaningful error messages for all scenarios
- **CORS Enabled** - Configured for React frontend integration
- **Database Integration** - PostgreSQL with TypeORM
- **Vercel Ready** - Optimized for serverless deployment on Vercel

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for database operations
- **PostgreSQL** - Database (hosted on Neon)
- **bcrypt** - Password hashing library
- **class-validator** - Input validation
- **class-transformer** - Response transformation

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (recommended: Neon.tech for serverless)
- npm or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Database Setup (Neon)

1. Go to [Neon.tech](https://neon.tech) and create a free account
2. Create a new project and select the closest region
3. Copy the connection string from the dashboard
4. The connection string will look like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`

## Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

**Note**: Never commit the `.env` file to version control. It's already in `.gitignore`.

## Running the Application

```bash
# Development mode (with watch)
npm run start:dev

# Production build
npm run build
npm run start:prod
```

The application will start on `http://localhost:3001`

## API Endpoints

### POST /user/register

Register a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- **400 Bad Request** - Validation errors (invalid email format, weak password, etc.)
- **409 Conflict** - User with this email already exists
- **500 Internal Server Error** - Database or server errors

**Password Requirements:**

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%\*?&#)

## Interactive API Documentation (Swagger)

Once your server is running, access the Swagger UI at:

- **Development**: `http://localhost:3001/api`
- **Production**: `https://your-backend.vercel.app/api`

Swagger provides:

- ✅ Interactive API testing
- ✅ Request/response schemas
- ✅ Example payloads
- ✅ Try it out functionality

For detailed Swagger guide, see [SWAGGER_GUIDE.md](./SWAGGER_GUIDE.md)

## Deployment to Vercel

### Prerequisites

- Vercel account
- Neon PostgreSQL database

### Steps

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**

   ```bash
   # Install Vercel CLI (if not installed)
   npm i -g vercel

   # Deploy
   vercel
   ```

3. **Set Environment Variables on Vercel:**
   In the Vercel dashboard, add these environment variables:
   - `DATABASE_URL` - Your Neon connection string
   - `CORS_ORIGIN` - Your React frontend URL (e.g., `https://your-app.vercel.app`)
   - `PORT` - Optional (Vercel provides this automatically)

4. **Redeploy:**
   After adding environment variables, redeploy your application.

### Important Notes for Vercel Deployment

- The `vercel.json` file is already configured for NestJS serverless deployment
- Make sure to use the **pooled connection string** from Neon (not the direct connection)
- Update `CORS_ORIGIN` to your production frontend URL
- The database must be accessible from Vercel's serverless functions

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
src/
├── user/
│   ├── dto/
│   │   └── register-user.dto.ts    # Input validation DTO
│   ├── entities/
│   │   └── user.entity.ts           # User database entity
│   ├── user.controller.ts           # REST API endpoint
│   ├── user.service.ts              # Business logic
│   └── user.module.ts               # Module configuration
├── app.module.ts                    # Root module with TypeORM config
└── main.ts                          # Application entry point
```

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with 12 salt rounds
- **Password Exclusion**: Passwords are never returned in API responses
- **Input Validation**: Strict validation on all inputs
- **CORS**: Configured to only accept requests from specified origins
- **HTTPS**: Database connection uses SSL (required for Neon)
- **SQL Injection Protection**: TypeORM prevents SQL injection

## Error Handling

The API returns detailed error messages for:

- Email validation errors
- Password complexity errors
- Duplicate email registration
- Database connection errors

## Development

```bash
# Watch mode
npm run start:dev

# Debug mode
npm run start:debug

# Format code
npm run format

# Lint code
npm run lint
```

## License

MIT

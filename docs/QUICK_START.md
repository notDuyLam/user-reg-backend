# Quick Start Guide

Get the User Registration Backend running in 5 minutes!

## Prerequisites

- ✅ Node.js installed (v18 or higher)
- ✅ npm installed
- ✅ GitHub account (for Neon - free tier available)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Neon Database

1. Visit [neon.tech](https://neon.tech) and create a free account
2. Click **"Create Project"**
3. Choose a project name and region
4. Select **PostgreSQL version 15, 16, or 17** - all work fine (17 is newest stable)
5. Once created, click on **"Pooled connection"** tab
6. Copy the connection string (looks like this):

```
postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

## Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Windows (PowerShell)
echo "DATABASE_URL=your_neon_connection_string_here" > .env
echo "PORT=3001" >> .env
echo "CORS_ORIGIN=http://localhost:3000" >> .env

# Mac/Linux
cat > .env << EOF
DATABASE_URL=your_neon_connection_string_here
PORT=3001
CORS_ORIGIN=http://localhost:3000
EOF
```

**Important**: Replace `your_neon_connection_string_here` with the actual connection string from Step 2.

## Step 4: Run the Application

### Development Mode (with hot reload)

```bash
npm run start:dev
```

You should see:

```
Application is running on: http://localhost:3001
```

### Production Mode

```bash
npm run build
npm run start:prod
```

## Step 5: Test the API

Open a new terminal and test the registration endpoint:

```bash
# Successful registration
curl -X POST http://localhost:3001/user/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"SecurePass123!\"}"
```

Expected response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "email": "test@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Troubleshooting

### "Cannot connect to database"

- Make sure you copied the **pooled connection** string (not direct connection)
- Check that your Neon project is not paused (free tier auto-pauses after inactivity)
- Verify your DATABASE_URL in `.env` is correct
- Wait a moment for Neon to wake up if it was paused

### "Port 3001 already in use"

Change the port in `.env`:

```env
PORT=3002
```

Then update your frontend URL accordingly.

### "CORS error" in browser

Make sure `CORS_ORIGIN` in `.env` matches your frontend URL. For local development:

```env
CORS_ORIGIN=http://localhost:3000
```

## Next Steps

1. ✅ Backend is running
2. 📝 See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for integration examples
3. 🚀 See [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to Vercel
4. ⚛️ Build your React frontend and connect to `http://localhost:3001`

## Available Scripts

```bash
# Development (with watch mode)
npm run start:dev

# Build for production
npm run build

# Run production build
npm run start:prod

# Run tests
npm run test

# Check code style
npm run lint

# Format code
npm run format
```

## Common Issues

### Database Connection String Format

Correct format:

```
postgresql://user:password@host/database?sslmode=require
```

### Password Requirements

When creating test users, passwords must have:

- ✅ 8+ characters
- ✅ Uppercase letter (A-Z)
- ✅ Lowercase letter (a-z)
- ✅ Number (0-9)
- ✅ Special character (@$!%\*?&#)

Example: `SecurePass123!`

### Testing with Different Tools

**Using Postman:**

1. Method: POST
2. URL: `http://localhost:3001/user/register`
3. Headers: `Content-Type: application/json`
4. Body:

```json
{
  "email": "test@example.com",
  "password": "SecurePass123!"
}
```

**Using Thunder Client (VSCode extension):**

- Same as Postman

**Using Browser DevTools:**

```javascript
fetch('http://localhost:3001/user/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'SecurePass123!',
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

## Ready to Deploy?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel deployment instructions.

## Need Help?

- Check the [README.md](./README.md) for detailed information
- Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for frontend integration
- See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for technical details

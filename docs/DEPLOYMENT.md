# Deployment Guide

## Quick Deployment to Vercel + Neon

### Step 1: Set Up Neon Database

1. Visit [neon.tech](https://neon.tech) and sign up (free account)
2. Click "Create Project"
3. Choose a project name and region (select closest to your users)
4. Once created, you'll see a connection string like:
   ```
   postgresql://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. **Important**: Copy the connection string from the **"Pooled connection"** tab (not the direct connection)
6. The pooled connection looks similar but is optimized for serverless functions

### Step 2: Local Testing

1. Create a `.env` file in the root directory:

   ```env
   DATABASE_URL=your_neon_connection_string_here
   PORT=3001
   CORS_ORIGIN=http://localhost:3000
   ```

2. Install dependencies and run:

   ```bash
   npm install
   npm run start:dev
   ```

3. Test the API:
   ```bash
   curl -X POST http://localhost:3001/user/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"SecurePass123!"}'
   ```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI (if not installed):

   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy:

   ```bash
   vercel
   ```

   - Follow the prompts
   - Link to an existing project or create a new one
   - Use default settings

4. Add environment variables:

   ```bash
   vercel env add DATABASE_URL
   vercel env add CORS_ORIGIN
   vercel env add PORT
   ```

   Or add them via the Vercel dashboard:
   - Go to your project on vercel.com
   - Settings → Environment Variables
   - Add each variable

5. Redeploy:
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables:
   - DATABASE_URL: `your_neon_pooled_connection_string`
   - CORS_ORIGIN: `https://your-react-app.vercel.app` (your frontend URL)
   - PORT: (optional, Vercel provides this)
7. Deploy

### Step 4: Update Environment Variables

After deployment, update your environment variables in the Vercel dashboard:

1. Go to your project → Settings → Environment Variables
2. Add/Update:
   - `DATABASE_URL`: Your Neon pooled connection string
   - `CORS_ORIGIN`: Your production React frontend URL (e.g., `https://your-frontend.vercel.app`)
   - `PORT`: Leave default or remove (Vercel handles this)

### Step 5: Test Production API

Your API will be available at: `https://your-project.vercel.app`

Test with curl:

```bash
curl -X POST https://your-project.vercel.app/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'
```

## Important Notes

### Connection String Types

Neon provides two types of connection strings:

1. **Direct connection**: Standard PostgreSQL connection

   ```
   postgresql://user:pass@host/db?sslmode=require
   ```

2. **Pooled connection (Recommended for Vercel)**: Optimized for serverless

   ```
   postgresql://user:pass@host/db?sslmode=require&pgbouncer=true
   ```

   The pooled connection has a different endpoint and is specifically designed for serverless functions that don't maintain persistent connections.

### CORS Configuration

After deploying both frontend and backend:

1. Get your frontend production URL (e.g., `https://my-app.vercel.app`)
2. Update the `CORS_ORIGIN` environment variable in Vercel to point to your frontend URL
3. Redeploy the backend

If you have multiple origins, you can update the CORS configuration in `src/main.ts`:

```typescript
const origins = [
  configService.get('CORS_ORIGIN'),
  'http://localhost:3000',
  'https://your-frontend.vercel.app',
].filter(Boolean);

app.enableCors({
  origin: origins,
  credentials: true,
});
```

### Database Synchronization

The app is currently set to `synchronize: true` in `src/app.module.ts`, which auto-creates tables.

**For Production:**

- Consider setting `synchronize: false`
- Use TypeORM migrations instead
- Create migration: `npm run typeorm migration:generate -- -n InitialMigration`
- Run migration: `npm run typeorm migration:run`

### Troubleshooting

**Connection Timeout Errors:**

- Ensure you're using the **pooled connection string** from Neon
- Check that your Neon project is not paused (free tier pauses after inactivity)
- Verify DATABASE_URL is correct in Vercel environment variables

**CORS Errors:**

- Verify CORS_ORIGIN matches your frontend URL exactly
- Check browser console for the actual error
- Ensure CORS allows credentials if your frontend sends cookies

**Build Failures:**

- Check Vercel build logs for errors
- Ensure all dependencies are listed in package.json (not devDependencies)
- Verify Node.js version compatibility

## Verification Checklist

- [ ] Neon database created and running
- [ ] Environment variables set in Vercel
- [ ] Database connection successful (check Vercel logs)
- [ ] CORS_ORIGIN points to correct frontend URL
- [ ] API accessible at your Vercel URL
- [ ] Registration endpoint works
- [ ] Error handling works (try duplicate email)
- [ ] Password validation works (try weak password)
- [ ] Frontend can connect to backend

## Support

For issues:

- Check Vercel deployment logs
- Check Neon database logs
- Review NestJS error messages
- Verify environment variables in Vercel dashboard

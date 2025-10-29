# Swagger API Documentation

## Access Swagger UI

Once your application is running, access the interactive API documentation at:

- **Development**: `http://localhost:3001/api`
- **Production**: `https://your-backend.vercel.app/api`

## What is Swagger?

Swagger (OpenAPI) provides an interactive API documentation interface where you can:

- ✅ View all available endpoints
- ✅ See request/response schemas
- ✅ Test API endpoints directly in the browser
- ✅ Understand validation requirements
- ✅ View example responses

## How to Use

### 1. Start Your Server

```bash
npm run start:dev
```

### 2. Open Swagger UI

Navigate to `http://localhost:3001/api` in your browser

### 3. Explore Endpoints

- Click on the `POST /user/register` endpoint
- Click "Try it out" button
- Fill in the request body with example data:

```json
{
  "email": "test@example.com",
  "password": "SecurePass123!"
}
```

- Click "Execute"
- View the response below

### 4. Test Different Scenarios

#### Success Case

**Request:**

```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!"
}
```

**Expected Response:** `201 Created`

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "email": "newuser@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Validation Error

**Request:**

```json
{
  "email": "invalid-email",
  "password": "weak"
}
```

**Expected Response:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "message": [
    "Please provide a valid email address",
    "Password must be at least 8 characters long",
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ],
  "error": "Bad Request"
}
```

#### Duplicate Email

**Request:**

```json
{
  "email": "newuser@example.com",
  "password": "AnotherPass456!"
}
```

**Expected Response:** `409 Conflict`

```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "error": "Conflict"
}
```

## Swagger Features

### View Models

Swagger automatically generates schemas for:

- `RegisterUserDto` - Request body structure
- Response schemas for success and error cases

### Interactive Testing

Swagger allows you to:

- Fill in form fields directly
- See validation rules in real-time
- Execute requests and view responses
- Test different scenarios without coding

### Export OpenAPI Spec

You can export the OpenAPI specification:

```bash
curl http://localhost:3001/api-json > openapi.json
```

This generates a `openapi.json` file you can use with:

- Postman (import OpenAPI)
- Swagger Editor
- Other API clients

## API Documentation Details

### Endpoint Information

Each endpoint shows:

- **HTTP Method**: POST, GET, etc.
- **Path**: `/user/register`
- **Description**: What the endpoint does
- **Request Body**: Required fields and formats
- **Response Codes**: 201, 400, 409, 500
- **Response Examples**: Sample responses for each status code

### Validation Rules Displayed

Swagger UI shows:

- Required fields (marked with red asterisk \*)
- Field types (string, number, etc.)
- Minimum/maximum values
- Regular expressions for password validation
- Example values

## Swagger Configuration

The Swagger setup is configured in `src/main.ts`:

```typescript
const config = new DocumentBuilder()
  .setTitle('User Registration API')
  .setDescription(
    'API for user registration with email and password validation',
  )
  .setVersion('1.0')
  .addTag('users')
  .addServer('http://localhost:3001', 'Development server')
  .addServer('https://your-backend.vercel.app', 'Production server')
  .build();
```

## Custom Decorators Used

### @ApiTags('users')

- Groups related endpoints

### @ApiOperation()

- Adds description to endpoint

### @ApiBody()

- Documents request body with examples

### @ApiResponse()

- Documents all possible responses (201, 400, 409, 500)

### @ApiProperty()

- Documents DTO properties
- Shows examples and descriptions

## Tips

1. **Test Locally First**: Always test in development before production
2. **Check Validation**: Try invalid inputs to see validation errors
3. **Read Descriptions**: Each endpoint has detailed descriptions
4. **Review Schemas**: Understand data structures before integrating
5. **Save Examples**: Copy working examples for your frontend code

## Troubleshooting

### "Cannot GET /api"

- Make sure your server is running
- Check that you're accessing `http://localhost:3001/api`
- Verify Swagger is configured in `main.ts`

### Swagger Not Loading

```bash
# Check if @nestjs/swagger is installed
npm list @nestjs/swagger

# Reinstall if needed
npm install @nestjs/swagger
```

## Integration with Frontend

Use Swagger to:

1. Understand API structure
2. Copy request examples
3. Generate TypeScript types (using tools like `swagger-typescript-api`)
4. Test API before implementing frontend

## Advanced: Generating Client SDKs

You can generate client SDKs from the OpenAPI spec:

```bash
# Install generator
npm install -g @openapitools/openapi-generator-cli

# Generate TypeScript client
openapi-generator-cli generate \
  -i http://localhost:3001/api-json \
  -g typescript-axios \
  -o ./generated-client
```

## See Also

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Detailed API reference
- [README.md](./README.md) - Project setup
- [QUICK_START.md](./QUICK_START.md) - Quick start guide

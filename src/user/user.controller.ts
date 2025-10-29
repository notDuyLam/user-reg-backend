import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Get, UnauthorizedException } from '@nestjs/common';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Create a new user account with email and password. Password must meet complexity requirements.',
  })
  @ApiBody({
    type: RegisterUserDto,
    description: 'User registration data',
    examples: {
      example1: {
        summary: 'Valid registration example',
        description: 'Example of a valid registration payload',
        value: {
          email: 'user@example.com',
          password: 'SecurePass123!',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: {
      example: {
        success: true,
        message: 'User registered successfully',
        data: {
          id: 1,
          email: 'user@example.com',
          createdAt: '2024-01-15T10:30:00.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error - invalid email or weak password',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'Please provide a valid email address',
          'Password must be at least 8 characters long',
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - email already exists',
    schema: {
      example: {
        statusCode: 409,
        message: 'User with this email already exists',
        error: 'Conflict',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Failed to create user',
        error: 'Internal Server Error',
      },
    },
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.userService.register(registerUserDto);
    return {
      success: true,
      message: 'User registered successfully',
      data: user,
    };
  }

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Login user', description: 'Authenticate user with email and password.' })
	@ApiBody({
		type: LoginUserDto,
		description: 'User login credentials',
		examples: {
			default: {
				summary: 'Valid login example',
				value: { email: 'user@example.com', password: 'SecurePass123!' },
			},
		},
	})
	@ApiResponse({ status: 200, description: 'Login successful' })
	@ApiResponse({ status: 401, description: 'Invalid credentials' })
	async login(@Body() loginUserDto: LoginUserDto) {
		try {
			const user = await this.userService.login(loginUserDto);
			return {
				success: true,
				message: 'Login successful',
				data: user,
			};
		} catch (error) {
			if (error instanceof UnauthorizedException) {
				throw error;
			}
			throw error;
		}
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'List users', description: 'Retrieve a list of all users.' })
	@ApiResponse({ status: 200, description: 'List of users returned' })
	async listUsers() {
		const users = await this.userService.findAll();
		return {
			success: true,
			data: users,
		};
	}
}


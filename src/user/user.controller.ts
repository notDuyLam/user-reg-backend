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
}


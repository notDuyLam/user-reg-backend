import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
	@ApiProperty({
		example: 'user@example.com',
		description: 'Registered user email address',
	})
	@IsEmail({}, { message: 'Please provide a valid email address' })
	@IsNotEmpty({ message: 'Email is required' })
	email: string;

	@ApiProperty({ example: 'SecurePass123!', description: 'User password' })
	@IsNotEmpty({ message: 'Password is required' })
	password: string;
}



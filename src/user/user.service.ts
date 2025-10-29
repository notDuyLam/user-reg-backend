import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<Omit<User, 'password'>> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    try {
      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(registerUserDto.password, saltRounds);

      // Create new user
      const user = this.userRepository.create({
        email: registerUserDto.email,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(user);

      // Return user without password
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

	async login(loginUserDto: LoginUserDto): Promise<Omit<User, 'password'>> {
		const user = await this.userRepository.findOne({ where: { email: loginUserDto.email } });
		if (!user) {
			throw new UnauthorizedException('Invalid email or password');
		}

		const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException('Invalid email or password');
		}

		const { password, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}

	async findAll(): Promise<Array<Omit<User, 'password'>>> {
		const users = await this.userRepository.find();
		return users.map(({ password, ...rest }) => rest);
	}
}


import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const hashedPassword = await hash(data.password, 12);

    try {
      const new_user = await this.usersService.createUser({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });

      return new_user;
    } catch (error) {
      if (error.code == 'P2002') {
        throw new HttpException(
          'User with email already exists',
          HttpStatus.FOUND,
        );
      }
      throw new HttpException('Unknow Error', HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new HttpException(
        "User with email doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }

    const checkPassword = await compare(password, user.password);

    if (checkPassword) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } else {
      throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
    }
  }

  async generateAccessToken(id) {
    return this.jwtService.sign({ sub: id });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    const new_user = await this.prisma.user.create({
      data,
    });

    return {
      id: new_user.id,
      name: new_user.name,
      email: new_user.email,
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  }
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    return user;
  }
}

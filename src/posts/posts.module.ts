import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false,
  })],
  controllers: [PostsController],
  providers: [PostsService, PrismaService]
})

export class PostsModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [UsersModule, AuthModule, PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false,
  }), PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

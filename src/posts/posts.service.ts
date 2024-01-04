import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async createPost(data: { userId: string; title: string; body: string }) {
    const newPost = this.prisma.post.create({
      data: {
        user: {
          connect: {
            id: data.userId,
          },
        },
        title: data.title,
        body: data.body,
      },
    });

    return newPost;
  }

  async updatePost(postId: number, data: { title: string; body: string }) {
    const updatedPost = this.prisma.post.update({
      where: {
        id: postId,
      },
      data,
    });

    return updatedPost;
  }

  async getUserPosts(userId) {
    return await this.prisma.post.findMany({ where: { userId: userId } });
  }

  async getPosts() {
    return await this.prisma.post.findMany();
  }

  async getPostById(postId: number) {
    return await this.prisma.post.findUnique({ where: { id: postId } });
  }
}

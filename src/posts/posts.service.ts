import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostDetailsDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async createPost(userId: string, data: PostDetailsDto) {
    const newPost = this.prisma.post.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        title: data.title,
        body: data.body,
      },
    });

    return newPost;
  }

  async updatePost(postId: number, data: PostDetailsDto) {
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

  async deletePost(postId: number) {
    await this.prisma.post.delete({where: {id: postId }})
    return "Post Deleted"
  }
}

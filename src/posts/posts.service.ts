import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}
    async createPost(data: {userId: string, title: string, body: string}) {
        const new_post = this.prisma.post.create({
            data: {
                user: {
                    connect: {
                        id: data.userId
                    }
                },
                title: data.title,
                body: data.body
            }
        })

        return new_post
    }

    async getUserPosts(userId) {
        return await this.prisma.post.findMany({where: {userId: userId}})
    }

    async getPosts() {
        return await this.prisma.post.findMany()
    }
}

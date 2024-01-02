import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async viewPosts() {
        return await this.postsService.getPosts()
    }

    @UseGuards(AuthGuard())
    @Get("/user")
    async viewUserPosts(@Request() req) {
        return await this.postsService.getUserPosts(req.user.id)
    }

    @UseGuards(AuthGuard())
    @Post()
    async createPost(@Body() data, @Request() req) {
        const new_post = await this.postsService.createPost({userId: req.user.id, title: data.title, body: data.body})
        return new_post
    }
}

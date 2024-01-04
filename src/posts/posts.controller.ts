import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Gives all posts' })
  @Get()
  async viewPosts() {
    return await this.postsService.getPosts();
  }

  @ApiOperation({ summary: 'Give post according to id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':id')
  async viewPost(@Param('id') postId) {
    return await this.postsService.getPostById(postId);
  }

  @ApiOperation({ summary: 'Gives posts of a specific user' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/user')
  async viewUserPosts(@Request() req) {
    return await this.postsService.getUserPosts(req.user.id);
  }

  @ApiOperation({ summary: 'Creates new posts for a specific user' })
  @ApiBody({
    description: 'Post Details',
    type: CreatePostDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('')
  async createPost(@Body() data: CreatePostDto, @Request() req) {
    const new_post = await this.postsService.createPost({
      userId: req.user.id,
      title: data.title,
      body: data.body,
    });
    return new_post;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put(':id')
  async updatePost(
    @Param('id') postId,
    @Body() data: CreatePostDto,
    @Request() req,
  ) {
    const new_post = await this.postsService.updatePost(postId, {
      title: data.title,
      body: data.body,
    });
    return new_post;
  }
}

import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PostDetailsDto } from './posts.dto';
import { EditiorGuard } from 'src/auth/editor.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // View Posts
  @ApiOperation({ summary: 'Gives all posts' })
  @Get()
  async viewPosts() {
    return await this.postsService.getPosts();
  }

  // View Post by ID
  @ApiOperation({ summary: 'Give post according to id' })
  @ApiParam({
    name: 'id',
    required: true,
    schema: {
      type: 'integer',
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':id')
  async viewPost(@Param('id') postId) {
    return await this.postsService.getPostById(parseInt(postId));
  }

  // View User Post
  @ApiOperation({ summary: 'Gives posts of a specific user' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/user')
  async viewUserPosts(@Request() req) {
    return await this.postsService.getUserPosts(req.user.id);
  }

  // Create Post
  @ApiOperation({ summary: 'Creates new posts for a specific user' })
  @ApiBody({
    description: 'Post Details',
    type: PostDetailsDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), EditiorGuard)
  @Post('')
  async createPost(@Body() data: PostDetailsDto, @Request() req) {
    const new_post = await this.postsService.createPost(req.user.id, {
      title: data.title,
      body: data.body,
    });
    return new_post;
  }

  // Update Post
  @ApiOperation({ summary: 'Updates Post' })
  @ApiParam({
    name: 'id',
    required: true,
    schema: {
      type: 'integer',
    },
  })
  @ApiBody({
    description: 'Post Details',
    type: PostDetailsDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), EditiorGuard)
  @Put(':id')
  async updatePost(@Param('id') postId, @Body() data: PostDetailsDto) {
    const new_post = await this.postsService.updatePost(parseInt(postId), {
      title: data.title,
      body: data.body,
    });
    return new_post;
  }

  // Delete Post
  @ApiOperation({ summary: 'Deletes Post' })
  @ApiParam({
    name: 'id',
    required: true,
    schema: {
      type: 'integer',
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), EditiorGuard)
  @Delete(':id')
  async deletePost(@Param('id') postId) {
    const response = await this.postsService.deletePost(parseInt(postId));
    return response;
  }
}

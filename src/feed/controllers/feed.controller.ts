import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/auth-guard/jwt-auth-guard';
import { RolesGaurd } from 'src/auth/auth-guard/roles-gaurd';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedService } from '../feed.service';
import { FeedPost } from '../services/models/post.interface';

@Controller()
export class FeedController {
  constructor(private feedService: FeedService) {}

  @UseGuards(JwtAuthGuard, RolesGaurd)
  @Post('feed')
  create(@Body() feedPost: FeedPost) {
    return this.feedService.createPost(feedPost);
  }

  @UseGuards(JwtAuthGuard, RolesGaurd)
  @Get('feed')
  findAll(){
    return this.feedService.findAllPosts();
  }

  // @Put(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() feedPost: FeedPost,
  // ): Observable<UpdateResult> {
  //   return this.feedService.updatePost(id, feedPost);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: number): Observable<DeleteResult> {
  //   return this.feedService.deletePost(id);
  // }
}

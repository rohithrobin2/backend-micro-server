import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from './services/models/post.enitity';
import { FeedPost } from './services/models/post.interface';

@Injectable()
export class FeedService {
  private client: ClientProxy;
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {
 
      this.client = ClientProxyFactory.create({
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      });
    }
  

  createPost(feedPost: FeedPost){
    // return from(this.feedPostRepository.save(feedPost));
    return this.client
    .send<string, FeedPost>('feed/post', feedPost)
    .pipe();
  }

  findAllPosts() {
    return this.feedPostRepository.find();
  }

//   updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
//     return from(this.feedPostRepository.update(id, feedPost));
//   }

//   deletePost(id: number): Observable<DeleteResult> {
//     return from(this.feedPostRepository.delete(id));
//   }
 }

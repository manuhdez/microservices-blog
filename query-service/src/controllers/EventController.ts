import { Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import PostController from './PostController';

export interface Event {
  type: string;
  payload?: Object;
}

export class EventTypes {
  public static postCreated = 'postCreated';
  public static commentCreated = 'commentCreated';
  public static commentUpdated = 'commentUpdated';
}

export default class EventController {
  constructor(public postController: PostController) {}

  handleEvent(event: Event) {
    const { type, payload } = event;
    console.log(`Event received ${type}`);

    switch (type) {
      case EventTypes.postCreated:
        this.handlePostCreated(payload as Post);
      case EventTypes.commentCreated:
        this.handleCommentCreated(payload as Comment);
      case EventTypes.commentUpdated:
        this.handleCommentUpdated(payload as Comment);
      default:
        return false;
    }
  }

  handlePostCreated(data: Post) {
    this.postController.addPost(data);
  }

  handleCommentCreated(data: Comment) {
    this.postController.addComment(data);
  }

  handleCommentUpdated(data: Comment) {
    this.postController.updateCommentStatus(data);
  }

  async migrate() {
    const events = await this.getOlderEvents();
    console.log({ events });
    if (!events.length) return false;

    events.forEach((event) => {
      this.handleEvent(event);
    });

    return true;
  }

  async getOlderEvents(): Promise<Event[]> {
    try {
      const response = await axios.get<Event[]>(
        process.env.EVENT_BUS_URL as string
      );
      return response.data;
    } catch {
      return [];
    }
  }
}

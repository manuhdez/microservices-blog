import { Response } from 'express';
import axios from 'axios';

import { Comment, CommentStatus } from '../types/Comment';

import CommentController from './CommentController';

export interface Event {
  type: string;
  payload?: Object;
}

export enum EventTypes {
  commentCreated = 'commentCreated',
}

export default class EventController {
  constructor(public commentController: CommentController) {}

  handleEvent(event: Event, res: Response) {
    const { type, payload } = event;
    console.log(`Event received ${type}`);

    switch (type) {
      case EventTypes.commentCreated:
        return this.handleCommentCreated(payload as Comment, res);
      default:
        return res
          .status(400)
          .json({ success: false, message: 'Event not registered' });
    }
  }

  handleCommentCreated(data: Comment, res: Response) {
    const { id, postId } = data;

    data.status = CommentStatus.pending;
    this.commentController.addNewComment(data);

    // automatic moderation
    if (data.content.includes('orange')) {
      this.commentController.resolveCommentModeration(
        id,
        CommentStatus.rejected,
        res
      );
    } else {
      this.commentController.resolveCommentModeration(
        id,
        CommentStatus.approved,
        res
      );
    }

    return res.status(200).json({
      success: true,
      message: `Comment with id ${id} created on post ${postId}`,
    });
  }

  public static emitEvent(event: Event) {
    axios
      .post(process.env.EVENT_BUS_URL as string, event)
      .catch(() => console.log(`Failed to emit event ${event.type}`));
  }
}

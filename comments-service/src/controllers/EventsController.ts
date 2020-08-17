import { Response } from 'express';
import axios from 'axios';
import CommentsList, { CommentData } from '../CommentsList';

export interface Event {
  type: string;
  payload?: Object;
}

export enum EventTypes {
  commentCreated = 'commentCreated',
  commentModerated = 'commentModerated',
}

export default class EventsController {
  constructor(public commentController: CommentsList) {}

  handleEvent(event: Event, res: Response) {
    const { type, payload } = event;
    console.log(`Event received ${type}`);

    switch (type) {
      case EventTypes.commentModerated:
        return this.handleCommentModerated(payload as CommentData, res);
      default:
        return res
          .status(400)
          .json({ success: false, message: 'Event not registered' });
    }
  }

  handleCommentModerated(comment: CommentData, res: Response) {
    // update comment inside the comments list
    const hasBeenUpdated = this.commentController.updateCommentStatus(comment);

    if (hasBeenUpdated) {
      return res.status(200).json({
        success: true,
        message: `Comment with id ${comment.id} moderation resolved ${comment.status}`,
      });
    }

    return res.status(404).json({
      success: false,
      message: `Comment with id ${comment.id} not found`,
    });
  }

  public static emitEvent(event: Event) {
    axios
      .post(process.env.EVENT_BUS_URL as string, event)
      .catch(() => console.log(`Failed to emit event ${event.type}`));
  }
}

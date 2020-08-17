import { CommentList, Comment, CommentStatus } from '../types/Comment';
import EventController from './EventController';
import { Response } from 'express';

interface CommentStore {
  unresolved: CommentList;
  resolved: CommentList;
}

const defaultComments: CommentStore = {
  resolved: [],
  unresolved: [],
};

export default class CommentController {
  private comments: CommentStore;

  constructor(comments: CommentStore = defaultComments) {
    this.comments = comments;
  }

  addNewComment(comment: Comment) {
    this.comments.unresolved.push(comment);
  }

  resolveCommentModeration(
    commentId: number,
    newStatus: CommentStatus,
    res: Response
  ) {
    const commentIndex = this.comments.unresolved.findIndex(
      (item) => item.id === commentId
    );

    if (commentIndex !== -1) {
      const [updatedComment] = this.comments.unresolved.splice(commentIndex, 1);
      updatedComment.status = newStatus;

      this.comments.resolved.push(updatedComment);
      EventController.emitEvent({
        type: 'commentModerated',
        payload: updatedComment,
      });

      return res
        .status(200)
        .json({ message: 'Comment successfully moderated' });
    } else {
      return res
        .status(404)
        .json({ message: 'Cannot find comment to moderate' });
    }
  }

  getUnresolvedComments(): CommentList {
    return this.comments.unresolved;
  }

  getResolvedComments(): CommentList {
    return this.comments.resolved;
  }

  getComments(): CommentStore {
    return this.comments;
  }

  getCommentById(id: number) {
    const comments = [...this.comments.resolved, ...this.comments.unresolved];
    if (!comments) return null;

    return comments.find((comment) => comment.id === id);
  }
}

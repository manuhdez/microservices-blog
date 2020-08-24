import axios from 'axios';

export interface CommentData {
  id: number;
  postId: number;
  content: string;
  status: 'pending';
}

interface CommentEvent {
  type: string;
  payload?: Object;
}

export enum CommentStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export default class CommentsList {
  private commentsList: CommentData[];
  private eventBusUrl = process.env.EVENT_BUS_URL as string;

  constructor(defaultData: CommentData[] = []) {
    this.commentsList = defaultData;
  }

  createComment(postId: number, content: string): CommentData {
    const newComment: CommentData = {
      id: this.commentsList.length + 1,
      postId,
      content,
      status: 'pending',
    };

    this.commentsList.push(newComment);
    this.sendCommentEvent({ type: 'commentCreated', payload: newComment });

    return newComment;
  }

  getCommentsListFromPost(id: number): CommentData[] {
    return this.commentsList.filter(({ postId }) => postId === id);
  }

  updateCommentStatus(comment: CommentData): boolean {
    const commentIndex = this.commentsList.findIndex(
      (c) => c.id === comment.id
    );

    if (commentIndex !== -1) {
      this.commentsList[commentIndex] = comment;
      this.sendCommentEvent({ type: 'commentUpdated', payload: comment });
      return true;
    }

    return false;
  }

  async sendCommentEvent(event: CommentEvent) {
    await axios.post(this.eventBusUrl, event);
  }
}

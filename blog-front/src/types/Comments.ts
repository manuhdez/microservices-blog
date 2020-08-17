export interface Comment {
  id: number;
  postId: number;
  content: string;
  status: CommentStatus;
}

export enum CommentStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export type CommentList = Comment[];

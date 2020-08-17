export interface Comment {
  id: number;
  postId: number;
  content: string;
  status: CommentStatus;
}

export type CommentList = Comment[];

export enum CommentStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

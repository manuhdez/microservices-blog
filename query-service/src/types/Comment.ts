export interface Comment {
  id: number;
  postId: number;
  content: string;
}

export type CommentList = Comment[];

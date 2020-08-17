import { CommentList } from './Comments';

export interface Post {
  id: number;
  title: string;
  comments: CommentList;
}

export type PostList = Post[];

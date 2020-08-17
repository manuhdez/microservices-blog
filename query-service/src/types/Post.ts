import { CommentList } from './Comment';

export interface Post {
  id: number;
  title: string;
  comments: CommentList;
}

export type PostList = Post[];

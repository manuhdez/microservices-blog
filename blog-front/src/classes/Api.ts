import { Post, PostList } from '../types/Posts';
import { Comment, CommentList } from '../types/Comments';

interface ApiRequestData {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  body?: { [key: string]: any };
}

interface PostListResponse {
  posts: PostList;
}

export default class Api {
  constructor(private baseUrl: string) {}

  public async createPost(title: string) {
    return await this.request<Post>({
      url: '/posts/create',
      method: 'POST',
      body: { title },
    });
  }

  public async getPostsList() {
    const response = await this.request<PostListResponse>({
      url: '/posts',
      method: 'GET',
    });
    return response.posts;
  }

  public async createCommentForPost(postId: number, content: string) {
    return await this.request<Comment>({
      url: `/posts/${postId}/comments`,
      method: 'POST',
      body: { content },
    });
  }

  public async getCommentsFromPost(postId: number) {
    return await this.request<CommentList>({
      url: `/posts/${postId}/comments`,
      method: 'GET',
    });
  }

  private async request<T>(data: ApiRequestData) {
    const { url, method, body } = data;

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    return (await response.json()) as T;
  }
}

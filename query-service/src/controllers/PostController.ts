import { PostList, Post } from '../types/Post';
import { Comment } from '../types/Comment';

export default class PostController {
  private posts: PostList;

  constructor(defaultPosts: PostList = []) {
    this.posts = defaultPosts;
  }

  addPost(data: Post) {
    data.comments = [];
    this.posts.push(data);
  }

  addComment(data: Comment) {
    const postIndex = this.posts.findIndex((p) => p.id === data.postId);

    if (postIndex !== -1) {
      this.posts[postIndex].comments.push(data);
    } else {
      console.log(`Could not add the comment to the post ${data.postId}`);
    }
  }

  getPosts(): PostList {
    return this.posts;
  }

  updateCommentStatus(data: Comment): boolean {
    try {
      const postIndex = this.posts.findIndex((post) => post.id === data.postId);
      const commentIndex = this.posts[postIndex].comments.findIndex(
        (comment) => comment.id === data.id
      );
      this.posts[postIndex].comments[commentIndex] = data;

      return true;
    } catch (err) {
      return false;
    }
  }
}

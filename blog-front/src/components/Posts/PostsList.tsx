import React from 'react';
import { PostList } from '../../types/Posts';
import PostCard from './PostCard';

interface PostListProps {
  updatePostsList: () => void;
  posts: PostList;
}

export default function PostsList(props: PostListProps) {
  const { posts, updatePostsList } = props;
  return (
    <div className="p-5">
      <h1 className="mb-5 text-2xl bold">Posts</h1>
      <ul className="grid grid-cols-4 gap-2 grid-flow-col">
        {posts.map((post) => (
          <PostCard key={post.id} updateList={updatePostsList} {...post} />
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { PostList } from '../../types/Posts';
import Api from '../../classes/Api';
import PostCard from './PostCard';

export default function PostsList() {
  const [posts, setPost] = useState<PostList>([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    const baseUrl = process.env.REACT_APP_QUERY_SERVICE_URL as string;
    const api = new Api(baseUrl);

    const apiResponse = await api.getPostsList();

    if (apiResponse.length) {
      setPost(apiResponse);
    }
  };

  return (
    <div className="p-5">
      <h1 className="mb-5 text-2xl bold">Posts</h1>
      <ul className="grid grid-cols-4 gap-2 grid-flow-col">
        {posts.map((post) => (
          <PostCard key={post.id} updateList={getAllPosts} {...post} />
        ))}
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import PostCreate from './components/Posts/PostCreate';
import PostsList from './components/Posts/PostsList';
import Api from './classes/Api';
import { PostList } from './types/Posts';

function App() {
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
    <div className="App">
      <Header />
      <main>
        <PostCreate updatePostsList={getAllPosts} />
        <PostsList posts={posts} updatePostsList={getAllPosts} />
      </main>
    </div>
  );
}

export default App;

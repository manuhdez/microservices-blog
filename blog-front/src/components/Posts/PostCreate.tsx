import React, { useState, FormEvent } from 'react';
import Api from '../../classes/Api';

interface PostCreateProps {
  updatePostsList: () => void;
}

export default function PostCreate(props: PostCreateProps): JSX.Element {
  const [postTitle, setPostTitle] = useState<string>('');

  const handleCreatePost = async (event: FormEvent) => {
    event.preventDefault();
    if (!postTitle) return;

    const postsBaseUrl = process.env.REACT_APP_POSTS_SERVICE_URL as string;

    const api = new Api(postsBaseUrl);
    await api.createPost(postTitle);
    setPostTitle('');
    handleUpdateList();
  };

  const handleUpdateList = () => {
    setTimeout(() => {
      props.updatePostsList();
    }, 1000);
  };

  const handleTitleChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setPostTitle(value);
  };

  return (
    <div className="flex justify-center mb-5 pb-5 border-b-2 ">
      <form className="w-full max-w-sm" onSubmit={handleCreatePost}>
        <h1 className="text-center my-5 text-2xl bold">Create New Post</h1>
        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="post-title"
          >
            Title
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="post-title"
            type="text"
            value={postTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

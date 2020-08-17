import React, { useState, FormEvent } from 'react';
import Api from '../../../classes/Api';

interface CommentCreateProps {
  postId: number;
  updateList: () => void;
}

export default function CommentCreate(props: CommentCreateProps) {
  const { postId, updateList } = props;

  const [commentValue, setCommentValue] = useState<string>('');

  const handleCommentCreate = async (event: FormEvent) => {
    event.preventDefault();

    const baseUrl = process.env.REACT_APP_COMMENTS_SERVICE_URL as string;
    const api = new Api(baseUrl);
    await api.createCommentForPost(postId, commentValue);

    setCommentValue('');
    window.setTimeout(updateList, 1000);
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setCommentValue(value);
  };

  return (
    <div className="px-6 py-4">
      <form className="w-full max-w-sm" onSubmit={handleCommentCreate}>
        <div className="flex flex-col mb-6">
          <p className="mb-2 text-l bold">Add a comment</p>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="post-title"
            type="text"
            value={commentValue}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}

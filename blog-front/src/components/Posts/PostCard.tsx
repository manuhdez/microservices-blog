import React from 'react';
import { Post } from '../../types/Posts';

import CommentCreate from './Comments/CommentCreate';
import CommentsList from './Comments/CommentsList';

interface PostProps extends Post {
  updateList: () => void;
}

export default function PostCard({
  id,
  title,
  comments,
  updateList,
}: PostProps) {
  return (
    <li className="max-w-sm rounded overflow-hidden shadow-lg m-4 ml-0 mt-0 flex flex-col">
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-2">{title}</div>
      </div>
      <div className="mt-auto">
        <CommentsList comments={comments} />
        <CommentCreate postId={id} updateList={updateList} />
      </div>
    </li>
  );
}

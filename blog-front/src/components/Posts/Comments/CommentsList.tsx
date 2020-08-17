import React from 'react';
import CommentItem from './CommentItem';
import { Comment } from '../../../types/Comments';

interface CommentsListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="px-6 py-4" hidden={!comments.length}>
      <div className="font-bold text-m mb-2">
        {`${comments.length} comments`}
      </div>
      <ul>
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </ul>
    </div>
  );
}

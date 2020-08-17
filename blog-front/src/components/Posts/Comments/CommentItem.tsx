import React from 'react';
import { Comment, CommentStatus } from '../../../types/Comments';

export default function CommentItem({ content, status }: Comment) {
  const getStatusBadge = () => {
    switch (status) {
      case CommentStatus.pending:
        return '⏳ ';
      case CommentStatus.approved:
        return '✅ ';
      case CommentStatus.rejected:
        return '❌ ';
    }
  };

  return <li>{`${getStatusBadge()} ${content}`}</li>;
}

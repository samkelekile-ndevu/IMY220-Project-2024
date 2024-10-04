import React from 'react';
import {Comment} from './Comment';

class Comments extends React.Component {
  render() {
    const { comments } = this.props;

    return (
      <div className="comments-container">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }
}

export {Comments};
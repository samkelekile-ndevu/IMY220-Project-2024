import React from 'react';

class Comment extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const { comment } = this.props;

    return (
      <div className="comment">
        <p>{comment.text}</p>
        <p>By: {comment.username}</p>
        <p>Created on: {comment.createdAt}</p>
      </div>
    );
  }
}

export { Comment };

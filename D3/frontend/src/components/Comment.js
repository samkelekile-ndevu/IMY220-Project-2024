import React from 'react';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: null,
      error: null,
    };
  }

  componentDidMount() {
    const { comment_id } = this.props;
    if (comment_id) {
      this.fetchComment(comment_id);
    }
  }

  componentDidUpdate(prevProps) {
    const { comment_id } = this.props;
    // Fetch comment only if the comment_id has changed
    if (comment_id && comment_id !== prevProps.comment_id) {
      this.fetchComment(comment_id);
    }
  }

  fetchComment = async (comment_id) => {
    try {
      const response = await fetch(`http://localhost:5000/comments/${comment_id}`);
      if (!response.ok) throw new Error('Failed to fetch comment');
      const data = await response.json();
      this.setState({ comment: data });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { comment, error } = this.state;
    
    if (error) return <div>Error loading comment: {error}</div>;
    if (!comment) return <div>Loading comment...</div>;

    return (
      <div className="comment">
        <p>{comment.text}</p>
        <p>By: {comment.author.username}</p>
        <p>Created on: {comment.dateCreated}</p>
      </div>
    );
  }
}

export { Comment };

// AddComment.js
import React, { useState } from 'react';

const AddComment = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState(null); // To store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error

    if (commentText.trim()) {
      try {
        await onAddComment(commentText); // Await the API call
        setCommentText(''); // Clear the input field after submission
      } catch (err) {
        setError('Failed to add comment. Please try again.'); // Set error if the API call fails
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Leave a comment..."
        required
      />
      <button type="submit">Add Comment</button>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
    </form>
  );
};

export { AddComment };

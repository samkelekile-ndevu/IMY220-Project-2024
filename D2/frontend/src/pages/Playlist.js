import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Playlist = () => {
  const { id } = useParams(); // Access the id from the URL
  const [comments, setComments] = useState([]); // State for comments
  const [commentInput, setCommentInput] = useState(''); // State for comment input

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };


  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      author: 'User', // Replace with actual user name
      text: commentInput,
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setCommentInput(''); // Clear input field
  };

  return (
    <React.Fragment>
      <Header />
      <div className="playlist-page">
        <h1>Playlist Page</h1>
        <p>Displaying playlist for ID: {id}</p>
        <div className="playlist-details">
          <h2>Playlist Name</h2>
          <p>Description: This is a great playlist.</p>
          <p>Created by: User XYZ</p>
        </div>

        {/* Comments section */}
        <div className="comments-section">
          <h3>Comments</h3>
          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={index}>
                <div className="comment-author">{comment.author}</div>
                <div className="comment-text">{comment.text}</div>
              </li>
            ))}
          </ul>

          {/* Comment form */}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={commentInput}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export { Playlist };

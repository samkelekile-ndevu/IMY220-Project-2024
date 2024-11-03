import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Comment } from '../components/Comment';
import { Song } from '../components/Song';
import { AddComment } from '../components/AddComment';

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/playlists/${id}`);
        if (!response.ok) throw new Error('Failed to fetch playlist');
        const data = await response.json();
        setPlaylist(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  //generate random key value to use when rendering my components
  const generateRandomKey = (length = 24) =>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}


  const handleAddComment = async (text) => {
    console.log("Adding comment:", text);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/playlists/${id}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to add comment: ${errorDetails}`);
      }

      const addedComment = await response.json();
      setPlaylist((prev) => ({
        ...prev,
        comments: [...prev.comments, addedComment._id],
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  

  return (
    <React.Fragment>
      <Header />
      <h1>Playlist Page</h1>
      <div className="playlist-detail">
        <h2>{playlist.name}</h2>
        <p>Created by: {playlist.creator.username}</p>
        <p>Description: {playlist.description}</p>
        {playlist.coverImage && <img src={playlist.coverImage} alt={`${playlist.name} cover`} />}
        <p>Date Created: {new Date(playlist.dateCreated).toLocaleDateString()}</p>

        <h3>Songs</h3>
        <ul className="song-list">
          {playlist.songs.map((song) => (
            <Song key={generateRandomKey()} song={song}/>
          ))}
        </ul>

        <h3>Comments</h3>
        <ul className="comment-list">
          {playlist.comments.map((comment) => (
            <Comment key={generateRandomKey()} comment_id={comment} />
          ))}
        </ul>

        <AddComment onAddComment={handleAddComment} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export { Playlist };

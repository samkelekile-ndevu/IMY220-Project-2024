const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// MongoDB URI and JWT_SECRET
const JWT_SECRET = "your_jwt_secret"; // Set your JWT secret here
const uri = "mongodb+srv://u21593681:19628288@api-backend.l3af6.mongodb.net/?retryWrites=true&w=majority&appName=api-backend";

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}
connectToMongoDB();

// ======================== Define Schemas and Models ========================

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  gender: String,
  bio: String,
  profileImage: String,
  password: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date
});

// Define Playlist Schema and Model
const playlistSchema = new mongoose.Schema({
  name: String,
  creator: { type: String, ref: 'User' },
  // creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  coverImage: String,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date
});

// Define Song Schema and Model
const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  playlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date
});

// Define Comment Schema and Model
const commentSchema = new mongoose.Schema({
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  playlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: Date
});

// Create Models from Schemas
const User = mongoose.model('User', userSchema);
const Playlist = mongoose.model('Playlist', playlistSchema);
const Song = mongoose.model('Song', songSchema);
const Comment = mongoose.model('Comment', commentSchema);

// ======================== Middleware ========================
// Use CORS middleware
app.use(cors({
  origin: '*', // Replace with your front-end URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials
}));


app.use(express.json()); // Parse incoming JSON requests


// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token', error: err.message });
    }
    req.userId = decoded.id;
    next();
  });
};

// ======================== Authentication Routes ========================

// User Registration (Signup)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check for required fields
  if (!username || !email || !password) {
    return res.status(400).send({ message: 'Username, email, and password are required.' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'Email already in use.' });
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password: password,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    });

    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send({ message: 'Error saving user', error: err.message });
  }
});


// User Login
app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user || password !== user.password) {
          return res.status(401).send({ message: 'Invalid credentials' });
      }

      const username = user.username;
      const userId = user._id;
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.send(JSON.stringify({ token, username, userId }));
  } catch (err) {
      console.error("Login error:", err); // Log the error
      res.status(500).send({ message: 'Internal server error' });
  }
});

// Endpoint to get a specific user by userId
app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  // Fetch user by userId and respond
  try {
      const user = await User.findById(userId); // Assuming Mongoose is used
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.json(user);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

// Endpoint to update a specific user by userId
app.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  // Update user by userId and respond
  try {
      const user = await User.findByIdAndUpdate(userId, updates, { new: true });
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.json(user);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

// ======================== User Search Route ========================

app.get('/users', async (req, res) => {   //all users
  try {
    const users = await User.find().exec();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Search Users by Username or Email
app.get('/users/search', authenticate, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send({ message: 'Search query is required.' });
  }

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).select('-password').exec();

    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ======================== Friend Request Routes ========================

// Get Friend Requests for the Authenticated User
app.get('/users/me/requests', authenticate, async (req, res) => {
  try {
    // Find the user by their authenticated ID and populate friendRequests with basic details
    const user = await User.findById(req.userId).populate('friendRequests', 'username email');
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    res.send(user.friendRequests);
  } catch (err) {
    console.error("Error fetching friend requests:", err);
    res.status(500).send({ message: 'Failed to retrieve friend requests', error: err.message });
  }
});


// Send a Friend Request
app.post('/users/:userId/friend-requests', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const friend = await User.findById(req.params.userId);

    if (!friend) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if a friend request has already been sent
    if (friend.friendRequests.includes(user._id)) {
      return res.status(400).send({ message: 'Friend request already sent' });
    }

    // Check if they are already friends
    if (user.friends.includes(friend._id)) {
      return res.status(400).send({ message: 'Already friends' });
    }

    // Send friend request
    friend.friendRequests.push(user._id);
    await friend.save();

    res.status(200).send({ message: 'Friend request sent' });
  } catch (err) {
    console.error("Error sending friend request:", err);
    res.status(500).send({ message: 'Failed to send friend request', error: err.message });
  }
});


// Accept a Friend Request
app.put('/users/:friendId/accept-requests', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const friend = await User.findById(req.params.friendId);

    if (!friend) {
      return res.status(404).send({ message: 'Friend user not found' });
    }

    if (!user.friendRequests.includes(friend._id)) {
      return res.status(400).send({ message: 'No friend request from this user' });
    }

    // Check if they are already friends
    if (user.friends.includes(friend._id)) {
      return res.status(400).send({ message: 'Already friends with this user' });
    }

    // Add each other as friends
    user.friends.push(friend._id);
    friend.friends.push(user._id);

    // Remove the friend request
    user.friendRequests = user.friendRequests.filter(id => !id.equals(friend._id));

    await user.save();
    await friend.save();

    res.send({
      message: 'Friend request accepted',
      user: {
        id: user._id,
        friends: user.friends,
        friendRequests: user.friendRequests
      },
      friend: {
        id: friend._id,
        friends: friend.friends
      }
    });
  } catch (err) {
    res.status(500).send({ message: 'Server error, please try again', error: err });
  }
});

// Unfriend
app.delete('/users/:userId/unfriend', authenticate, async (req, res) => {
  const { userId } = req.params; // ID of the friend to unfriend
  const currentUserId = req.userId; // Get current user's ID from the authenticated request

  try {
    // Find both the current user and the friend in the database
    const currentUser = await User.findById(currentUserId);
    const friend = await User.findById(userId);

    if (!currentUser || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove each user from the other's friend list
    currentUser.friends = currentUser.friends.filter(id => id.toString() !== userId);
    friend.friends = friend.friends.filter(id => id.toString() !== currentUserId);

    // Save the updated user documents
    await currentUser.save();
    await friend.save();

    res.status(200).json({ message: 'Successfully unfriended' });
  } catch (error) {
    console.error("Error unfriending:", error);
    res.status(500).json({ message: 'Error unfriending', error: error.message });
  }
});


// ======================== Playlist Routes ========================

// Create a Playlist
app.post('/playlists', authenticate, async (req, res) => {
  const playlist = new Playlist({ ...req.body, creator: req.userId });
  try {
    await playlist.save();
    await User.findByIdAndUpdate(req.userId, { $push: { playlists: playlist._id } });
    res.status(201).send(playlist);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Remove Playlist from User
app.delete('/playlists/:playlistId', authenticate, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);
    if (!playlist) return res.status(404).send({ message: 'Playlist not found' });

    await User.findByIdAndUpdate(req.userId, { $pull: { playlists: playlist._id } });

    res.send({ message: 'Playlist removed from user\'s list successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get All Playlists
app.get('/playlists', async (req, res) => {
  try {
    const playlists = await Playlist.find().exec();
    res.send(playlists);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a Playlist by ID
app.get('/playlists/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('creator', 'username').exec();
    if (!playlist) {
      res.status(404).send({ message: 'Playlist not found' });
    } else {
      res.send(playlist);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a Comment to a Playlist
app.post('/playlists/:id/comments', authenticate, async (req, res) => {
  const { text } = req.body;

  // Log the authenticated user ID
  console.log("Authenticated User ID:", req.userId);

  const comment = new Comment({ text, author: req.userId, playlistId: req.params.id });

  try {
    await comment.save();

    const playlist = await Playlist.findById(req.params.id);
    playlist.comments.push(comment._id);
    await playlist.save();

    // Populate the author field to include the username
    const populatedComment = await Comment.findById(comment._id).populate('author', 'username');
    
    res.status(201).send(populatedComment);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(400).send({ message: 'Failed to add comment', error: err.message });
  }
});

// Get a Comment by ID
app.get('/comments/:commentId', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate('author', 'username').exec();
    if (!comment) {
      return res.status(404).send({ message: 'Comment not found' });
    }
    res.send(comment);
  } catch (err) {
    console.error("Error retrieving comment:", err);
    res.status(500).send({ message: 'Failed to retrieve comment', error: err.message });
  }
});


// ======================== Song Routes ========================

// Add a Song to a Playlist
app.post('/songs', authenticate, async (req, res) => {
  const song = new Song(req.body);
  try {
    await song.save();
    
    if (req.body.playlistId) {
      await Playlist.findByIdAndUpdate(req.body.playlistId, { $push: { songs: song._id } });
    }

    res.status(201).json(song); // Ensure JSON response
  } catch (err) {
    console.error("Error adding song:", err); // Log error for debugging
    res.status(400).json({ message: 'Error adding song.', error: err.message }); // Return JSON error response
  }
});


// Get All Songs
app.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find().exec();
    res.send(songs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ======================== Remove Song from Playlist ========================
app.delete('/playlists/:playlistId/songs/:songId', authenticate, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);
    if (!playlist) return res.status(404).send({ message: 'Playlist not found' });

    const song = await Song.findById(req.params.songId);
    if (!song) return res.status(404).send({ message: 'Song not found' });

    // Remove the song ID from the playlist's songs array
    playlist.songs.pull(song._id);
    await playlist.save();

    res.send({ message: 'Song removed from playlist successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// ======================== Song Search Route ========================

// Search Songs by Title or Artist
app.get('/songs/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send({ message: 'Search query is required.' });
  }

  try {
    const songs = await Song.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive match
        { artist: { $regex: query, $options: 'i' } }
      ]
    }).exec();

    res.send(songs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ======================== Playlist Search Route ========================

// Search Playlists by Name or Description
app.get('/playlists/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send({ message: 'Search query is required.' });
  }

  try {
    const playlists = await Playlist.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive match
        { description: { $regex: query, $options: 'i' } }
      ]
    }).exec();

    res.send(playlists);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ======================== Add a Song to a Playlist by IDs ========================

// Add a Song to a Playlist by IDs
app.post('/playlists/:playlistId/songs/:songId', authenticate, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);
    if (!playlist) return res.status(404).send({ message: 'Playlist not found' });

    const song = await Song.findById(req.params.songId);
    if (!song) return res.status(404).send({ message: 'Song not found' });

    playlist.songs.push(song._id);
    await playlist.save();

    res.status(200).send(playlist);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

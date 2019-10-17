const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users' // They can only delete their own posts, and their avatar and name is shown next to it
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String // Because user can delete their own account, but keep their posts on the network
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users' // Which user liked which post
        // User object that will have ID which will limit that you can like only once
      }
    }
  ],
  // Each post has its own comments
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);

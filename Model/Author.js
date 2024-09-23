// Import required modules
const mongoose = require('mongoose');
const signup = require('../Model/Signup_model')

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect(`mongodb+srv://patidarnisha2003:HuMzdTvd3BtwiY7P@cluster0.m3p26jq.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Post schema
// const postSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   user_id:{type: mongoose.Schema.Types.ObjectId, ref: signup, required: true },
//   author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming there is a User model
//   category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Assuming there is a Category model
//   tags: [String],
//   status: { type: String, default: 'draft' }, // You can set a default value if needed
//   slug: { type: String, unique: true },
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now },
// });

// Define the Comment schema
// const commentSchema = new mongoose.Schema({
//   post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
//   content: { type: String, required: true },
//   author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming there is a User model
//   created_at: { type: Date, default: Date.now },
//   updated_at: { type: Date, default: Date.now },
// });
const authorSchema = new mongoose.Schema({
name:{type:String}
})

// // Create models
// const Post = mongoose.model('Post', postSchema);
// const Comment = mongoose.model('Comment', commentSchema);
const Author = mongoose.model('authore',authorSchema)

// Export the models
module.exports = { Author};

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  mail: { type: String, required: true },
  heading: { type: String, required: true },
  content: { type: String, required: true },
  imageURL: { type: String, required: true },
  date: { type: Date, default: Date.now },
  authorName: { type: String, required: true },
  authorImage: { type: String, required: true },
  likes: { type: Number, required: true },
  views: { type: Number, required: true }
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;

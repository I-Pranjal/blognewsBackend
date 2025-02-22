import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
    const { mail, heading, content, imageURL, authorName, authorImage, likes, views } = req.body;
    try {
        const newBlog = new Blog({ mail, heading, content, imageURL, authorName, authorImage, likes, views });
        await newBlog.save();
        res.json(newBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add blog' });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get blogs' });
    }
};

export const getUserBlogs = async (req, res) => {
    const email = req.query.email;
    try {
        const blogs = await Blog.find({ mail: email });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get blogs' });
    }
};

export const updateLikes = async (req, res) => {
    try {
      const { liked } = req.body;
      const blog = await Blog.findOne({ heading: req.params.title });
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
      blog.likes = liked ? blog.likes + 1 : blog.likes - 1;
      await blog.save();
      res.status(200).json({ likes: blog.likes });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateViews = async (req, res) => {
    try {
      const { view } = req.body;
      const blog = await Blog.findOne({ heading: req.params.title });
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
      blog.views = view;
      await blog.save();
      res.status(200).json({ views: blog.views });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

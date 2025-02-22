import Comment from "../models/Comment.js";

export const addComment =  async (req, res) => {
    const { blogTitle, authorMail , comment, comName, comImgURL } = req.body;
    try {
        const newComment = new Comment({ blogTitle, authorMail , comment , comName, comImgURL });
        await newComment.save();
        res.json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
};



// Get request to get all comments of a blog by title and authorMail
export const getComment =  async (req, res) => {
    const { blogTitle, authorMail } = req.query;
    try {
        const comments = await Comment.find({ blogTitle, authorMail });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get comments' });
    }
};


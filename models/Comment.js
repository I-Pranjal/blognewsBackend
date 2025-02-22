import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    blogTitle: { type: String, required: true },
    time : { type: Date, default: Date.now },
    authorMail : { type: String, required: true },
    comment : { type: String, required: true },
    comName : { type: String, required: true },
    comImgURL : { type: String, required: true }
});
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
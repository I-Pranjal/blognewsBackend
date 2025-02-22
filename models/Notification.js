import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    lbImgURL : { type: String, required: true },    // URL of the image of the person who liked the blog
    lbName: { type: String, required: true },      // Name of the person who liked the blog
    date: { type: Date, default: Date.now },
    mail: { type: String, required: true }, // Email address of the person whose article was liked
    nType : { type: String, required: true , default:'like' } // Type of notification
});
const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
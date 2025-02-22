import Notification from '../models/Notification.js';

// Route to get all notifications by email
export const getNotification = async (req, res) => {
    const { email } = req.query;
    try {
        const notifications = await Notification.find({ mail: email }).sort({ date: -1 });
        // console.log(notifications) ; 
        // Return first five notifications only
        res.json(notifications.slice(0, 5));
    } catch (error) {
        res.status(500).json({ error: 'Failed to get notifications' });
    }
};

// Route to add a new notification (like)
export const addLikeNotification = async (req, res) => {
    const { lbImgURL, lbName, mail } = req.body;
    try {
        const newNotification = new Notification({ lbImgURL, lbName, mail });
        await newNotification.save();
        res.json({success: true});
    } catch (error) {
        res.status(500).json({ error: 'Failed to add notification' });
    }
};

// Route to add a notification (comment)
export const addCommentNotification  =  async (req, res) => {
    const { lbImgURL, lbName, mail } = req.body;
    try {
        const newNotification = new Notification({ lbImgURL, lbName, mail, nType : 'comment' });
        await newNotification.save();
        res.json({success: true});
    } catch (error) {
        res.status(500).json({ error: 'Failed to add notification' });
    }
}; 



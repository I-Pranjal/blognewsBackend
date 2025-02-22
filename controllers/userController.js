import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import confMail from '../confMail.js';

const userMail = process.env.senderMail ; 
const userPassword = process.env.senderPassword ;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '817643488404-kitr3mdv05aesvn1kjg8qnd7giinbjab.apps.googleusercontent.com'; // Replace with your Client ID


// Route to add a new user
export const addUser =  async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to sign up' });
    }
};

// Route to check the sign-in process
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email, password });
        if (existingUser) {
            res.json({ name: existingUser.name, email: existingUser.email });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to sign in' });
    }
};


// Route to sign in with google ---------------------------

const client = new OAuth2Client(CLIENT_ID);
export const googleSignIn =  async (req, res) => {
  const { token } = req.body;


  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is missing' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];

    const user = {
      id: userid,
      name: payload['name'],
      email: payload['email'],
      picture: payload['picture'],
    };

    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      const newUser = new User({ name: user.name, email: user.email, password: 'jackofalltraits', profileImage: user.picture });
      await newUser.save();
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }
};


// Route to send mail
export const subscribeMail =  async (req, res) => {
    // console.log("UserMail :" , userMail , "and User Password : " , userPassword) ; 
    const { mail } = req.body;
    if (!mail) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // user : 'debatingliterary@gmail.com', 
                // pass : 'blqtthulfddxjqme'
                user: userMail,
                pass: userPassword // Use App Password if 2FA is enabled
            }
        });

        // Email options
        const mailOptions = {
            from: '"Magnews Subscription" <your-email@gmail.com>',
            to: mail,
            subject: 'Subscription Confirmation',
            html: confMail
                };

        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Subscribed successfully !!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

// Route to get stats
export const getStats = async (req, res) => {
  try {
    const result = await Notification.aggregate([
      {
        $match: {
          nType: 'like'   // Only likes are matched
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
          },
          likes: { $sum: 1 }  // Count of likes for each date
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          likes: 1
        }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

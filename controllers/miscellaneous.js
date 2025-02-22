

const userMail = process.env.senderMail ; 
const userPassword = process.env.senderPassword ;
// Route to send mail
app.post('/api/sendMail', async (req, res) => {
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
});




app.get('/api/stats', async (req, res) => {
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
  });


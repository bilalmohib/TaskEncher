import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, link, projectName, senderName } = req.body;

    // Set up Nodemailer and SMTP configuration
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: process.env.SMTP_SECURE === "true",
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });
    // Set up Nodemailer and Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mbilals9922@gmail.com",
        pass: "123321123BiLaL",
      },
    });

    // Define the email template
    const emailTemplate = `
      <h1>Welcome to Our TaskEncher!</h1>
      <p>Hello, Dear ${name},</p>
      <p>We are excited to have you on board.
      You have been invited to join our new project named ${projectName}.<br/> 
      Please find the details of the project below:</p>
      <!-- Add more details about the project here -->
      <p>Project Name: ${projectName}</p>
        <p>WorkSpace Link: ${link}</p>
      <p>Looking forward to working with you!</p>
      <p>Best Regards,</p>
      <p>Your TaskEncher Team</p>
    `;

    // Set up email options
    const mailOptions = {
      //   from: process.env.SMTP_FROM,
      from: "mbilals9922@gmail.com",
      to: "bilalmohib7896@gmail.com",
      subject: `Action Required: ${senderName} invited you to join a WorkSpace in TaskEncher`,
      html: emailTemplate,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error('Error sending email:', error); // Log the error to the console
  res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

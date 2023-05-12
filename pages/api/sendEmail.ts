import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { text, to, subject, cc } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bilalmohib7896@gmail.com',
        pass: 'heroku_624aae288a3b296', // Replace with your Gmail password or App Password
      },
    });

    const message = {
      text: text,
      from: 'bilalmohib7896@gmail.com',
      to: to,
      cc: cc ? cc : '',
      subject: subject,
    };

    try {
      await transporter.sendMail(message);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

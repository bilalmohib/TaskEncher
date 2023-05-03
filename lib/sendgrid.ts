import sgMail from '@sendgrid/mail';

export const sendEmail = async (to:any, subject:any, text:string) => {
  // @ts-ignore
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: 'bilalmohib7896@gmail.com',
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
};
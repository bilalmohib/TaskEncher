const sendEmail = async (
    text: string,
    to: string,
    subject: string,
    cc: string
) => {
    const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, to, subject, cc }),
    });

    const data = await response.json();
    if (data.success) {
        console.log('Email sent successfully');
    } else {
        console.error('Failed to send email');
    }
};
export default sendEmail;
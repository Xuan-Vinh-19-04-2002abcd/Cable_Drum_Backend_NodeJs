import nodemailer from 'nodemailer';

function sendEmaill(email, quantity) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'vinh.dang23@student.passerellesnumeriques.org',
                pass: 'vlwkakeaqkdemdet',
            },
        });
        const mailOptions = {
            from: 'vinh.dang23@student.passerellesnumeriques.org',
            to: email,
            subject: 'Cable Drum Request',
            text: `You have a new Cable Drum Request for ${quantity} cable drums.`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error); // Reject promise with error
            } else {
                console.log('Email sent:', info.response);
                resolve(); // Resolve promise
            }
        });
    });
}

export default sendEmaill;

import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    // Configure mail for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        $set: { verifyToken: hashedToken, verifyTokenExpire:new Date(Date.now() + 3600000) },
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: { forgotPasswordToken: hashedToken, forgotPasswordExpire: Date.now() + 360000 },
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '5997d0a60fdbc0',
        pass: 'd88081049bdc20',
      },
    });

    const mailOptions = {
      from: 'h@op.in',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<h1> <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>Click Here </a> to ${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'}
        or copy and paste the link below in your browser.
        <br>
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </h1>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
import nodemailer from 'nodemailer';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

// Force Node.js to use IPv4 (Render free tier doesn't support IPv6)
dns.setDefaultResultOrder('ipv4first');

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use STARTTLS on port 587
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS?.replace(/"/g, '').trim(),
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * Send OTP via Email (Gmail SMTP)
 * @param {string} email - Recipient email address
 * @param {string} otp - 6-digit one-time password
 * @param {string} name - Student name (optional)
 */
export const sendEmailOTP = async (email, otp, name = 'Student') => {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASS) {
      console.error('[Gmail SMTP] Missing GMAIL_USER or GMAIL_APP_PASS env vars.');
      return { success: false, error: 'Email configuration missing on server.' };
    }

    const mailOptions = {
      from: `"Prepzo AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Your Prepzo AI Verification Code: ${otp}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #000; margin: 0;">PREPZO <span style="color: #666;">AI</span></h1>
            <p style="color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Career Intelligence Protocol</p>
          </div>
          
          <div style="background-color: #fafafa; padding: 30px; border-radius: 8px; text-align: center;">
            <p style="font-size: 16px; color: #333; margin-bottom: 25px;">Hello ${name}, use the code below to access your account.</p>
            
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #000; margin-bottom: 25px; padding: 15px; background: #fff; border: 1px dashed #ccc; display: inline-block;">
              ${otp}
            </div>
            
            <p style="font-size: 12px; color: #999;">This code will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #aaa;">
            <p>&copy; 2026 Prepzo AI. All Rights Reserved.</p>
            <p>Designed for the next generation of engineers.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[Gmail SMTP] OTP email sent successfully to:', email, 'MessageId:', info.messageId);
    return { success: true, data: info };
  } catch (err) {
    console.error('[Gmail SMTP] Error details:', {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response
    });
    return { success: false, error: err.message };
  }
};

export default {
  sendEmailOTP,
};

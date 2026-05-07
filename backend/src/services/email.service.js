import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send OTP via Email (Resend)
 * @param {string} email - Recipient email address
 * @param {string} otp - 6-digit one-time password
 * @param {string} name - Student name (optional)
 */
export const sendEmailOTP = async (email, otp, name = 'Student') => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Prepzo AI <onboarding@resend.dev>',
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
    });

    if (error) {
      console.error('[Resend] Error sending email:', error);
      return { success: false, error };
    }

    console.log('[Resend] OTP email sent successfully to:', email);
    return { success: true, data };
  } catch (err) {
    console.error('[Resend] Unexpected error:', err);
    return { success: false, error: err.message };
  }
};

export default {
  sendEmailOTP,
};

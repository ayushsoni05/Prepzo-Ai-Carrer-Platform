import dotenv from 'dotenv';

dotenv.config();

/**
 * Send OTP via Email (Brevo REST API over HTTP)
 * @param {string} email - Recipient email address
 * @param {string} otp - 6-digit one-time password
 * @param {string} name - Student name (optional)
 */
export const sendEmailOTP = async (email, otp, name = 'Student') => {
  try {
    if (!process.env.BREVO_API_KEY) {
      console.error('[Brevo API] Missing BREVO_API_KEY env var.');
      return { success: false, error: 'Email configuration missing on server.' };
    }

    const senderEmail = process.env.EMAIL_FROM || 'prepzo.admin@gmail.com';
    const subject = `Your Prepzo AI Verification Code: ${otp}`;
    const html = `
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
    `;

    // Send via Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Prepzo AI', email: senderEmail },
        to: [{ email: email, name: name }],
        subject: subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email via Brevo API');
    }

    console.log('[Brevo API] OTP email sent successfully to:', email, 'MessageId:', data.messageId);
    return { success: true, data };
  } catch (err) {
    console.error('[Brevo API] Error details:', err.message);
    return { success: false, error: err.message };
  }
};

export default {
  sendEmailOTP,
};

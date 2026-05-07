import dotenv from 'dotenv';

dotenv.config();

/**
 * Helper to encode an email into base64url format required by Gmail API
 */
const createRawEmail = (to, subject, html) => {
  const from = `"Prepzo AI" <${process.env.GMAIL_USER}>`;
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `Content-Type: text/html; charset=utf-8`,
    `MIME-Version: 1.0`,
    '',
    html
  ].join('\r\n');

  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

/**
 * Get a fresh Access Token using the Refresh Token
 */
const getAccessToken = async () => {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID,
      client_secret: process.env.GMAIL_CLIENT_SECRET,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || 'Failed to refresh Google access token');
  }
  return data.access_token;
};

/**
 * Send OTP via Email (Gmail REST API over HTTP)
 * @param {string} email - Recipient email address
 * @param {string} otp - 6-digit one-time password
 * @param {string} name - Student name (optional)
 */
export const sendEmailOTP = async (email, otp, name = 'Student') => {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_REFRESH_TOKEN) {
      console.error('[Gmail API] Missing GMAIL OAuth2 env vars.');
      return { success: false, error: 'Email OAuth2 configuration missing on server.' };
    }

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

    // 1. Get Access Token
    const accessToken = await getAccessToken();

    // 2. Create raw base64 email
    const rawEmail = createRawEmail(email, subject, html);

    // 3. Send via Gmail REST API
    const response = await fetch('https://gmail.googleapis.com/upload/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: rawEmail }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to send email via Gmail API');
    }

    console.log('[Gmail API] OTP email sent successfully to:', email, 'MessageId:', data.id);
    return { success: true, data };
  } catch (err) {
    console.error('[Gmail API] Error details:', err.message);
    return { success: false, error: err.message };
  }
};

export default {
  sendEmailOTP,
};

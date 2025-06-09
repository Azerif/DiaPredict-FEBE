const nodemailer = require('nodemailer');

// Konfigurasi email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // atau gunakan SMTP lain
  auth: {
    user: process.env.EMAIL_USER, // email Anda
    pass: process.env.EMAIL_PASS  // app password Gmail
  }
});

const sendResetPasswordEmail = async (email, resetCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Password - DiaPredict',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #00B7E0; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">DiaPredict</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Reset Password</h2>
          <p style="color: #666; line-height: 1.6;">
            Kami menerima permintaan untuk reset password akun Anda. 
            Gunakan kode berikut untuk reset password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #00B7E0; color: white; padding: 20px; 
                        border-radius: 10px; display: inline-block; font-size: 24px;
                        font-weight: bold; letter-spacing: 3px;">
              ${resetCode}
            </div>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Masukkan kode ini di halaman reset password untuk membuat password baru.
          </p>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Kode ini akan expired dalam 15 menit. Jika Anda tidak meminta reset password, 
            abaikan email ini.
          </p>
        </div>
        
        <div style="background-color: #333; color: white; padding: 20px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">
            &copy; 2025 DiaPredict. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset password email sent to:', email);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Gagal mengirim email');
  }
};

module.exports = {
  sendResetPasswordEmail
};
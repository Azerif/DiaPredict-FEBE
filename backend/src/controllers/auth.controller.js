const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const crypto = require('crypto');
const { sendResetPasswordEmail } = require('../services/emailService');

// Generate random 6-digit code
const generateResetCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await UserModel.getByEmail(email);
      if (existingUser) {
        return res.status(409).json({ 
          success: false, 
          message: 'Email already registered' 
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        created_at: new Date()
      });
      
      // Generate token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        config.jwtSecret,
        { expiresIn: '24h' }
      );
      
      // Return user info (without password) and token
      const { password: _, ...userWithoutPassword } = newUser;
      
      res.status(201).json({
        success: true,
        data: {
          user: userWithoutPassword,
          token
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to register user',
        error: error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await UserModel.getByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid email or password' 
        });
      }
      
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid email or password' 
        });
      }
      
      // Generate token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: '24h' }
      );
      
      // Return user info (without password) and token
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json({
        success: true,
        data: {
          user: userWithoutPassword,
          token
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to login',
        error: error.message
      });
    }
  }

  // Forgot Password
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email harus diisi'
        });
      }

      // Cek apakah user dengan email ini ada
      const user = await UserModel.getByEmail(email);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Email tidak terdaftar'
        });
      }      // Generate reset code (6 digit)
      const resetCode = generateResetCode();
      
      // Tambahkan 7 jam (timezone Indonesia) untuk mengatasi masalah timezone
      const resetCodeExpiry = new Date(Date.now() + 30 * 60 * 1000 + 7 * 60 * 60 * 1000); // 30 menit dari sekarang + 7 jam (WIB)

      console.log('Generated reset code:', resetCode);
      console.log('Current time:', new Date());
      console.log('Expiry time with offset:', resetCodeExpiry);

      // Update user dengan reset code
      await UserModel.updateResetCode(user.id, resetCode, resetCodeExpiry);

      // Log reset code untuk testing (hapus di production)
      console.log(`Reset code for ${email}: ${resetCode}`);

      res.status(200).json({
        success: true,
        message: 'Kode reset password telah dikirim ke email Anda',
        // Untuk testing - hapus di production!
        resetCode: resetCode
      });

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server'
      });
    }
  }

  // Verify Reset Code
  async verifyResetCode(req, res) {
    try {
      const { email, code } = req.body;

      if (!email || !code) {
        return res.status(400).json({
          success: false,
          message: 'Email dan kode reset harus diisi'
        });
      }

      const user = await UserModel.getByEmailAndResetCode(email, code);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Kode reset tidak valid'
        });
      }      // Debugging info
      const currentTime = new Date();
      const expiryTime = new Date(user.reset_code_expiry);
      
      // Karena ada penambahan 7 jam, kita perlu membandingkannya dengan benar
      console.log('Current time:', currentTime.toISOString());
      console.log('Reset code expiry:', expiryTime.toISOString());
      console.log('Current timestamp:', currentTime.getTime());
      console.log('Expiry timestamp:', expiryTime.getTime());
      console.log('Is expired?', currentTime.getTime() > expiryTime.getTime());

      // Cek apakah kode sudah expired dengan membandingkan timestamp menggunakan getTime()
      if (currentTime.getTime() > expiryTime.getTime()) {
        return res.status(400).json({
          success: false,
          message: 'Kode reset sudah expired. Silakan request kode baru.'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Kode reset valid'
      });

    } catch (error) {
      console.error('Verify reset code error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server'
      });
    }
  }

  // Reset Password
  async resetPassword(req, res) {
    try {
      const { email, code, password } = req.body;

      if (!email || !code || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email, kode reset, dan password harus diisi'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password minimal 6 karakter'
        });
      }

      // Cari user berdasarkan email dan kode reset
      const user = await UserModel.getByEmailAndResetCode(email, code);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Email atau kode reset tidak valid'
        });
      }      // Cek apakah kode sudah expired
      const currentTime = new Date();
      const expiryTime = new Date(user.reset_code_expiry);
      
      // Bandingkan dengan mempertimbangkan timezone dengan getTime()
      if (currentTime.getTime() > expiryTime.getTime()) {
        return res.status(400).json({
          success: false,
          message: 'Kode reset sudah expired. Silakan request kode baru.'
        });
      }

      // Hash password baru
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update password user dan hapus reset code
      await UserModel.resetPassword(user.id, hashedPassword);

      res.status(200).json({
        success: true,
        message: 'Password berhasil direset'
      });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan server'
      });
    }
  }
}

module.exports = new AuthController();
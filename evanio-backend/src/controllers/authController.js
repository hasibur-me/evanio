import User from '../models/User.js';
import { generateToken, generateRefreshToken } from '../utils/generateToken.js';
import { sendWelcomeEmail } from '../utils/email.js';
import { triggerEmailSequence } from '../utils/emailSequences.js';
import { verify2FAToken, verifyBackupCode } from '../utils/twoFactor.js';
import { processReferral } from './referralController.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if this is the first user (no users exist) - make them admin
    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;

    // Only allow admin role if no admin exists yet, or if explicitly provided by existing admin
    let userRole = 'user';
    if (isFirstUser) {
      userRole = 'admin';
      console.log('First user registered - assigning admin role');
    } else if (role === 'admin') {
      // Check if any admin exists - only allow if none exists
      const adminExists = await User.findOne({ role: 'admin' });
      if (!adminExists) {
        userRole = 'admin';
        console.log('No admin exists - allowing admin registration');
      }
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: userRole,
    });

    // Process referral if referral code provided (non-blocking)
    const { referralCode } = req.body;
    if (referralCode) {
      processReferral(user._id, referralCode, normalizedEmail).catch(err => {
        console.error('Referral processing error:', err);
      });
    }

    // Send welcome email (non-blocking - don't fail registration if email fails)
    sendWelcomeEmail(normalizedEmail, name).catch(err => {
      console.error('Welcome email error:', err);
    });
    
    // Trigger welcome email sequence (non-blocking)
    triggerEmailSequence('welcomeSequence', user._id).catch(err => {
      console.error('Email sequence error:', err);
    });

    // Validate JWT secret before generating token
    if (!process.env.JWT_ACCESS_SECRET && !process.env.JWT_SECRET) {
      console.error('JWT secret missing - cannot generate token');
      return res.status(500).json({ 
        message: 'Server configuration error. Please contact support.' 
      });
    }

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    if (!accessToken || !refreshToken) {
      return res.status(500).json({ 
        message: 'Failed to generate authentication token. Please try again.' 
      });
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    
    // Provide more specific error messages
    let errorMessage = 'An error occurred during registration. Please try again.';
    if (error.name === 'ValidationError') {
      errorMessage = 'Invalid input data. Please check your information.';
    } else if (error.name === 'MongoServerError' || error.code === 11000) {
      errorMessage = 'Email already exists. Please use a different email.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    res.status(500).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      const { twoFactorToken } = req.body;
      
      if (!twoFactorToken) {
        return res.status(200).json({
          requires2FA: true,
          message: '2FA code required'
        });
      }

      // Verify 2FA token
      let isTokenValid = verify2FAToken(twoFactorToken, user.twoFactorSecret);
      
      // If token invalid, try backup code
      if (!isTokenValid) {
        isTokenValid = verifyBackupCode(twoFactorToken, user.twoFactorBackupCodes);
        if (isTokenValid) {
          await user.save(); // Save backup code usage
        }
      }

      if (!isTokenValid) {
        return res.status(401).json({ message: 'Invalid 2FA code' });
      }
    }

    // Validate JWT secret before generating token
    if (!process.env.JWT_ACCESS_SECRET && !process.env.JWT_SECRET) {
      console.error('JWT secret missing - cannot generate token');
      return res.status(500).json({ 
        message: 'Server configuration error. Please contact support.' 
      });
    }

    // Generate tokens and return user data
    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    if (!accessToken || !refreshToken) {
      return res.status(500).json({ 
        message: 'Failed to generate authentication token. Please try again.' 
      });
    }
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: accessToken,
      refreshToken: refreshToken,
      requires2FA: false
    });
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    
    // Provide more specific error messages
    let errorMessage = 'An error occurred during login. Please try again.';
    if (error.name === 'MongoServerError') {
      errorMessage = 'Database connection error. Please try again.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    res.status(500).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('documents')
      .populate('tickets')
      .populate('payments')
      .select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh token endpoint
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token
    const accessToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    res.json({
      token: accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
    res.status(500).json({ message: error.message });
  }
};



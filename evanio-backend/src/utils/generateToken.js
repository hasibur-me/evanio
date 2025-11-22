import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
  
  if (!secret) {
    console.error('JWT_SECRET or JWT_ACCESS_SECRET is not set in environment variables');
    throw new Error('JWT secret is not configured');
  }
  
  try {
    return jwt.sign({ id }, secret, {
      expiresIn: '30d',
    });
  } catch (error) {
    console.error('Token generation error:', error);
    throw error;
  }
};

export const generateRefreshToken = (id) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  
  if (!secret) {
    console.error('JWT_REFRESH_SECRET is not set in environment variables');
    throw new Error('JWT refresh secret is not configured');
  }
  
  try {
    return jwt.sign({ id }, secret, {
      expiresIn: '90d',
    });
  } catch (error) {
    console.error('Refresh token generation error:', error);
    throw error;
  }
};


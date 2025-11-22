import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/database.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

// Routes
import authRoutes from './src/routes/authRoutes.js';
import documentRoutes from './src/routes/documentRoutes.js';
import ticketRoutes from './src/routes/ticketRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import serviceRoutes from './src/routes/serviceRoutes.js';
import themeRoutes from './src/routes/themeRoutes.js';
import emailRoutes from './src/routes/emailRoutes.js';
import analyticsRoutes from './src/routes/analyticsRoutes.js';
import appointmentRoutes from './src/routes/appointmentRoutes.js';
import twoFactorRoutes from './src/routes/twoFactorRoutes.js';
import newsletterRoutes from './src/routes/newsletterRoutes.js';
import webhookRoutes from './src/routes/webhookRoutes.js';
import socialAuthRoutes from './src/routes/socialAuthRoutes.js';
import apiDocsRoutes from './src/routes/apiDocsRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import referralRoutes from './src/routes/referralRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import invoiceRoutes from './src/routes/invoiceRoutes.js';
import socialProofRoutes from './src/routes/socialProofRoutes.js';

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // In production, you might want to be stricter
      // For now, allow all origins if FRONTEND_URL is set to wildcard
      if (process.env.FRONTEND_URL === '*' || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/theme', themeRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/2fa', twoFactorRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/auth/social', socialAuthRoutes);
app.use('/api/docs', apiDocsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api', socialProofRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Evanio API Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      documents: '/api/documents',
      tickets: '/api/tickets',
      payments: '/api/payments',
      orders: '/api/orders',
      users: '/api/users',
      contact: '/api/contact',
      services: '/api/services',
      theme: '/api/theme',
      email: '/api/email',
      analytics: '/api/analytics',
      appointments: '/api/appointments',
      '2fa': '/api/2fa',
      newsletter: '/api/newsletter',
      webhooks: '/api/webhooks',
      'social-auth': '/api/auth/social',
      'api-docs': '/api/docs',
      reviews: '/api/reviews',
      referrals: '/api/referrals',
      blog: '/api/blog',
      invoices: '/api/invoices'
    }
  });
});

// API root endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Evanio API Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      documents: '/api/documents',
      tickets: '/api/tickets',
      payments: '/api/payments',
      orders: '/api/orders',
      users: '/api/users',
      contact: '/api/contact',
      services: '/api/services',
      theme: '/api/theme',
      email: '/api/email',
      analytics: '/api/analytics',
      appointments: '/api/appointments',
      '2fa': '/api/2fa',
      newsletter: '/api/newsletter',
      webhooks: '/api/webhooks',
      'social-auth': '/api/auth/social',
      'api-docs': '/api/docs',
      reviews: '/api/reviews',
      referrals: '/api/referrals',
      blog: '/api/blog',
      invoices: '/api/invoices'
    },
    documentation: '/api/docs',
    baseUrl: `${req.protocol}://${req.get('host')}`
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();


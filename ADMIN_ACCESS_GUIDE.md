# Admin Access Guide

## What is Admin Access?

**Admin access** is a special user role that provides full administrative control over your Evanio application. Admins have elevated permissions to manage all aspects of the system.

## 🔐 Admin Role & Authentication

### User Roles
The system has two user roles:
- **`user`** - Regular customer (default)
- **`admin`** - Administrator with full access

### How Admin Access Works

1. **Authentication**: Admins log in with email and password (same as regular users)
2. **Authorization**: The backend checks if `req.user.role === 'admin'` before allowing access
3. **Protection**: Admin routes are protected by middleware (`protect` + `admin`)

## 📋 Admin Capabilities

Admins can access and manage:

### 1. **Admin Dashboard** (`/admin`)
- View system statistics
- Monitor user activity
- Track revenue and orders

### 2. **User Management** (`/admin/users`)
- View all users
- Edit user profiles
- Change user roles
- Manage user accounts

### 3. **Order Management** (`/admin/orders`)
- View all orders (not just own)
- Update order status
- Process orders
- Cancel orders

### 4. **Contact Management** (`/admin/contacts`)
- View all contact form submissions
- Respond to inquiries
- Manage customer communications

### 5. **Ticket Management** (`/admin/tickets`)
- View all support tickets
- Respond to tickets
- Close/resolve tickets
- Assign tickets

### 6. **Review Management** (`/admin/reviews`)
- Moderate reviews
- Approve/reject reviews
- Respond to reviews
- Edit review status

### 7. **Blog Management** (`/admin/blog`)
- Create blog posts
- Edit existing posts
- Publish/unpublish posts
- Delete posts

### 8. **Document Management** (`/admin/documents`)
- View all documents
- Upload documents
- Manage document access
- Delete documents

### 9. **Analytics** (`/admin/analytics`)
- View comprehensive analytics
- Export data
- Revenue reports
- User statistics

### 10. **Settings** (`/admin/settings`)
- Configure system settings
- Manage webhooks
- Email configuration

### 11. **Webhooks** (`/admin/webhooks`)
- Create webhooks
- Manage webhook endpoints
- Test webhooks

### 12. **Email Composer** (`/admin/email-composer`)
- Send bulk emails
- Email templates
- Email campaigns

## 🚀 How to Create an Admin Account

### Method 1: Using the Script (Recommended)

```bash
cd evanio-backend
node scripts/createAdmin.js
```

This creates an admin user with:
- **Email**: `admin@evanio.com`
- **Password**: `Admin@2024!`
- **Role**: `admin`

**⚠️ Important**: Change the password immediately after first login!

### Method 2: First User Becomes Admin

If no users exist in the database, the **first user to register** automatically becomes an admin.

### Method 3: Manual Database Update

1. Create a regular user account
2. Update the user in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## 🔒 Security Features

### Middleware Protection

**Backend** (`src/middleware/auth.js`):
```javascript
// Protect any route (requires login)
router.get('/protected', protect, handler);

// Protect admin-only routes
router.get('/admin-only', protect, admin, handler);
```

**Frontend** (`src/components/ProtectedRoute.jsx`):
- Routes are protected client-side
- Non-admin users are redirected if they try to access admin pages

### Admin Route Protection

All admin routes use:
1. `protect` middleware - Verifies JWT token
2. `admin` middleware - Checks if `user.role === 'admin'`

If unauthorized:
- **Backend**: Returns `403 Forbidden` with message "Not authorized as admin"
- **Frontend**: Redirects to login or dashboard

## 📍 Admin Routes

### Frontend Routes (Protected)
- `/admin` - Admin Dashboard
- `/admin/users` - User Management
- `/admin/orders` - Order Management
- `/admin/contacts` - Contact Management
- `/admin/tickets` - Ticket Management
- `/admin/reviews` - Review Management
- `/admin/blog` - Blog Management
- `/admin/documents` - Document Management
- `/admin/analytics` - Analytics
- `/admin/settings` - Settings
- `/admin/webhooks` - Webhooks
- `/admin/email-composer` - Email Composer

### Backend Routes (Protected)
All admin routes are prefixed with `/api/` and protected:
- `GET /api/users/stats` - Admin only
- `GET /api/orders/admin/all` - Admin only
- `GET /api/contact/admin` - Admin only
- `PUT /api/contact/admin/:id` - Admin only
- `GET /api/reviews/admin/all` - Admin only
- And more...

## ✅ Checking if User is Admin

### Backend
```javascript
if (req.user.role === 'admin') {
  // Admin access granted
}
```

### Frontend
```javascript
const { user } = useAuth();
if (user?.role === 'admin') {
  // Show admin features
}
```

## 🔐 Best Practices

1. **Change Default Password**: Always change the default admin password
2. **Use Strong Passwords**: Admin accounts should have strong, unique passwords
3. **Enable 2FA**: Consider enabling two-factor authentication for admin accounts
4. **Limit Admin Accounts**: Only create admin accounts for trusted users
5. **Monitor Admin Activity**: Review admin actions regularly
6. **Secure Admin Routes**: Ensure admin routes are properly protected

## 🆘 Troubleshooting

### Can't Access Admin Dashboard?

1. **Check if you're logged in**: You must be logged in first
2. **Verify your role**: Your user account must have `role: 'admin'`
3. **Check token**: Make sure your JWT token is valid
4. **Clear cache**: Try clearing browser cache and cookies

### How to Check Your Role?

1. Login to the application
2. Go to your profile or dashboard
3. Check the user object - it should show `role: 'admin'`
4. Or check the browser console: `localStorage.getItem('user')`

### Reset Admin Password

1. Use the admin creation script (it will update existing user)
2. Or update directly in MongoDB
3. Or contact system administrator

## 📞 Support

If you need help with admin access:
1. Check this guide
2. Review the backend logs
3. Verify database user records
4. Contact system administrator


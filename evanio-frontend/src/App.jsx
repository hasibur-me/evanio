import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition } from './components/PageTransition';

// Public Pages
import Homepage from './pages/Homepage';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import Reviews from './pages/Reviews';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Testimonials from './pages/Testimonials';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import RefundPolicy from './pages/RefundPolicy';
import Documentation from './pages/Documentation';
import HelpCenter from './pages/HelpCenter';
import ServiceRequest from './pages/ServiceRequest';
import Login from './pages/Login';
import Register from './pages/Register';

// Service Pages
import BusinessFormation from './pages/BusinessFormation';
import BusinessConsultancy from './pages/BusinessConsultancy';
import WebsiteDevelopment from './pages/WebsiteDevelopment';
import LogoBranding from './pages/LogoBranding';
import PaymentGatewaySetup from './pages/PaymentGatewaySetup';
import BankAccountAssistance from './pages/BankAccountAssistance';
import SocialMediaSetup from './pages/SocialMediaSetup';
import DigitalMarketing from './pages/DigitalMarketing';
import AIAutomationIntegration from './pages/AIAutomationIntegration';

// User Dashboard Pages
import UserDashboard from './pages/dashboard/UserDashboard';
import ProjectStatus from './pages/dashboard/ProjectStatus';
import Services from './pages/dashboard/Services';
import Orders from './pages/dashboard/Orders';
import Appointments from './pages/dashboard/Appointments';
import Referrals from './pages/dashboard/Referrals';
import Invoices from './pages/dashboard/Invoices';
import Documents from './pages/dashboard/Documents';
import Tickets from './pages/dashboard/Tickets';
import Payments from './pages/dashboard/Payments';
import Notifications from './pages/dashboard/Notifications';
import Profile from './pages/dashboard/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDocuments from './pages/admin/AdminDocuments';
import AdminTickets from './pages/admin/AdminTickets';
import AdminContacts from './pages/admin/AdminContacts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminAnalyticsEnhanced from './pages/admin/AdminAnalyticsEnhanced';
import AdminEmailComposer from './pages/admin/AdminEmailComposer';
import AdminBlog from './pages/admin/AdminBlog';
import AdminReviews from './pages/admin/AdminReviews';
import AdminWebhooks from './pages/admin/AdminWebhooks';
import AdminSettings from './pages/admin/AdminSettings';

// Checkout
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';

function App() {
  return (
    <PageTransition>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:slug" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/service-request" element={<ServiceRequest />} />
        
        {/* Service Detail Routes */}
        <Route path="/service/business-formation" element={<BusinessFormation />} />
        <Route path="/service/business-consultancy" element={<BusinessConsultancy />} />
        <Route path="/service/website-development" element={<WebsiteDevelopment />} />
        <Route path="/service/logo-branding" element={<LogoBranding />} />
        <Route path="/service/payment-gateway-setup" element={<PaymentGatewaySetup />} />
        <Route path="/service/bank-account-assistance" element={<BankAccountAssistance />} />
        <Route path="/service/social-media-setup" element={<SocialMediaSetup />} />
        <Route path="/service/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/service/ai-automation-integration" element={<AIAutomationIntegration />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Checkout Routes */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />

        {/* Protected User Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/project-status"
          element={
            <ProtectedRoute>
              <ProjectStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/referrals"
          element={
            <ProtectedRoute>
              <Referrals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/invoices"
          element={
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tickets"
          element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/documents"
          element={
            <ProtectedRoute adminOnly>
              <AdminDocuments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tickets"
          element={
            <ProtectedRoute adminOnly>
              <AdminTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute adminOnly>
              <AdminContacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute adminOnly>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute adminOnly>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics-enhanced"
          element={
            <ProtectedRoute adminOnly>
              <AdminAnalyticsEnhanced />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/email"
          element={
            <ProtectedRoute adminOnly>
              <AdminEmailComposer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute adminOnly>
              <AdminBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute adminOnly>
              <AdminReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/webhooks"
          element={
            <ProtectedRoute adminOnly>
              <AdminWebhooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute adminOnly>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* 404 Route - must be last */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
                <a
                  href="/"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </PageTransition>
  );
}

export default App;


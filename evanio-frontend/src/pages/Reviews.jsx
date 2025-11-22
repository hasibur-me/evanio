import { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GlassBackground } from '../components/GlassBackground';
import { Card } from '../components/ui/Card';
import { GlassCard } from '../components/GlassCard';
import { ReviewCard } from '../components/ReviewCard';
import { TrustpilotReviews } from '../components/TrustpilotReviews';
import { Star, Filter, Search, ThumbsUp, Sparkles, Award, TrendingUp, Users, Quote, CheckCircle2, Verified } from 'lucide-react';
import { Input } from '../components/ui/Input';
import API from '@/lib/api';
import { useAuth } from '../context/AuthContext';

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
    fetchStats();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await API.get('/reviews');
      setReviews(response.data.reviews || []);
      setFilteredReviews(response.data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await API.get('/reviews/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching review stats:', error);
    }
  };

  const handleHelpful = async (reviewId) => {
    if (!user) {
      alert('Please login to mark reviews as helpful');
      return;
    }
    try {
      const response = await API.post(`/reviews/${reviewId}/helpful`);
      // Update local state
      setReviews(prev => prev.map(r => 
        r._id === reviewId 
          ? { ...r, helpfulCount: response.data.helpfulCount }
          : r
      ));
      setFilteredReviews(prev => prev.map(r => 
        r._id === reviewId 
          ? { ...r, helpfulCount: response.data.helpfulCount }
          : r
      ));
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  useEffect(() => {
    // Ensure reviews is an array
    const reviewsArray = Array.isArray(reviews) ? reviews : [];
    let filtered = reviewsArray;

    // Filter by rating
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(review => review.rating === parseInt(ratingFilter));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(review =>
        (review.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.serviceName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.comment || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  }, [searchTerm, ratingFilter, reviews]);

  const averageRating = stats?.average || (reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0');

  const ratingDistribution = stats?.distribution || {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  if (loading) {
    return (
      <GlassBackground>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-blue-500"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-400 animate-pulse" />
          </div>
        </div>
        <Footer />
      </GlassBackground>
    );
  }

  return (
    <GlassBackground>
      <Header />
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Hero Section */}
          <div className="text-center mb-16 relative">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Glass Card Container for Better Visibility */}
            <GlassCard variant="hero" className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-2 border-blue-400/50 rounded-full mb-8 backdrop-blur-md shadow-lg">
                  <Award className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm md:text-base font-bold text-white">Trusted by 300+ Companies</span>
                  <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-white drop-shadow-lg">Customer </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">
                    Reviews
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
                  Discover what our clients have to say about their experience with Evanio
                </p>

                {/* Rating Display - Enhanced */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full shadow-lg">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-7 h-7 md:w-8 md:h-8 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                      ))}
                    </div>
                    <div className="ml-2 flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{averageRating}</span>
                      <span className="text-lg text-white/80">/5</span>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full shadow-lg">
                    <span className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                      {stats?.total || reviews.length} Reviews
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Trustpilot Reviews Section */}
          <div className="mb-20">
            <TrustpilotReviews />
          </div>

          {/* Premium Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <GlassCard className="p-8 text-center group hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-400/50">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Star className="w-10 h-10 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">{averageRating}</span>
                </div>
              </div>
              <p className="text-white/90 font-semibold text-lg mb-1">Average Rating</p>
              <p className="text-white/50 text-sm">Based on {stats?.total || reviews.length} reviews</p>
            </GlassCard>

            <GlassCard className="p-8 text-center group hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-400/50">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative">
                  <Users className="w-10 h-10 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-white">{stats?.total || reviews.length}</div>
                </div>
              </div>
              <p className="text-white/90 font-semibold text-lg mb-1">Total Reviews</p>
              <p className="text-white/50 text-sm">From satisfied customers</p>
            </GlassCard>

            <GlassCard className="p-8 text-center group hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-green-400/50">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative">
                  <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-green-400">
                    {stats?.total > 0 ? Math.round((ratingDistribution[5] / stats.total) * 100) : 0}%
                  </div>
                </div>
              </div>
              <p className="text-white/90 font-semibold text-lg mb-1">5-Star Reviews</p>
              <p className="text-white/50 text-sm">Excellent ratings</p>
            </GlassCard>

            <GlassCard className="p-8 text-center group hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-400/50">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative">
                  <TrendingUp className="w-10 h-10 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-purple-400">
                    {stats?.total > 0 ? Math.round(((ratingDistribution[5] + ratingDistribution[4]) / stats.total) * 100) : 0}%
                  </div>
                </div>
              </div>
              <p className="text-white/90 font-semibold text-lg mb-1">Positive Reviews</p>
              <p className="text-white/50 text-sm">4+ star ratings</p>
            </GlassCard>
          </div>

          {/* Premium Filters Section */}
          <GlassCard className="mb-12 p-6 border-2 border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 group-hover:text-blue-400 transition-colors" />
                    <Input
                      glass
                      type="text"
                      placeholder="Search reviews by name, service, or comment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-4 py-3 bg-white/5 border-white/20 focus:border-blue-400/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-white/70" />
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="px-5 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400/50 backdrop-blur-sm transition-all hover:bg-white/15"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">⭐ 5 Stars</option>
                  <option value="4">⭐ 4 Stars</option>
                  <option value="3">⭐ 3 Stars</option>
                  <option value="2">⭐ 2 Stars</option>
                  <option value="1">⭐ 1 Star</option>
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Premium Reviews Grid */}
          {filteredReviews.length === 0 ? (
            <GlassCard className="p-16 text-center border-2 border-white/20">
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 text-xl font-semibold mb-2">No reviews found</p>
                <p className="text-white/50">Try adjusting your search or filter criteria</p>
              </div>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(filteredReviews) && filteredReviews.map((review, index) => (
                <GlassCard 
                  key={review._id} 
                  className="p-6 flex flex-col group hover:scale-[1.02] transition-all duration-300 border-2 border-transparent hover:border-blue-400/30 relative overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Premium Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    {/* Header with Rating */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 transition-all ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400 scale-100'
                                  : 'text-white/20'
                              }`}
                            />
                          ))}
                        </div>
                        {review.rating === 5 && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                            <Verified className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-300 font-semibold">Verified</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                          {(review.userId?.name || 'A')[0].toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            {review.userId?.name || 'Anonymous'}
                            {review.rating === 5 && <Award className="w-4 h-4 text-yellow-400" />}
                          </h3>
                          {review.serviceName && (
                            <p className="text-sm text-white/70 flex items-center gap-1">
                              <span>{review.serviceName}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {review.title && (
                        <p className="text-base font-semibold text-white/95 mt-2 mb-3 flex items-center gap-2">
                          <Quote className="w-4 h-4 text-blue-400" />
                          {review.title}
                        </p>
                      )}
                    </div>
                    
                    {/* Review Comment */}
                    <div className="relative mb-4 flex-grow">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-400/20" />
                      <p className="text-white/90 leading-relaxed text-sm relative z-10">
                        {review.comment}
                      </p>
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-white/60 pt-4 border-t border-white/10 mt-auto">
                      <span className="flex items-center gap-1">
                        <span>{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </span>
                      {user && (
                        <button
                          onClick={() => handleHelpful(review._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-all group/btn"
                        >
                          <ThumbsUp className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          <span className="font-semibold">{review.helpfulCount || 0}</span>
                        </button>
                      )}
                    </div>
                    
                    {/* Admin Response */}
                    {review.adminResponse && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Verified className="w-4 h-4 text-blue-300" />
                          <p className="text-xs text-blue-300 font-semibold">Official Response</p>
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed">{review.adminResponse.message}</p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {/* Premium Rating Distribution */}
          <GlassCard className="mt-16 p-8 border-2 border-white/20">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">Rating Distribution</h2>
            </div>
            <div className="space-y-5">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[rating] || 0;
                const total = stats?.total || reviews.length;
                const percentage = total > 0 ? (count / total) * 100 : 0;
                const colorClass = rating === 5 ? 'from-yellow-400 to-orange-400' :
                                  rating === 4 ? 'from-green-400 to-emerald-400' :
                                  rating === 3 ? 'from-blue-400 to-cyan-400' :
                                  rating === 2 ? 'from-orange-400 to-red-400' :
                                  'from-red-400 to-pink-400';
                return (
                  <div key={rating} className="group">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2 w-24">
                        <span className="text-white/90 font-bold text-lg">{rating}</span>
                        <Star className={`w-5 h-5 ${rating >= 4 ? 'fill-yellow-400 text-yellow-400' : rating >= 3 ? 'fill-blue-400 text-blue-400' : 'fill-orange-400 text-orange-400'}`} />
                      </div>
                      <div className="flex-1 relative">
                        <div className="bg-white/10 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-white/20">
                          <div
                            className={`bg-gradient-to-r ${colorClass} h-full transition-all duration-500 ease-out group-hover:brightness-110 relative`}
                            style={{ width: `${percentage}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-24 justify-end">
                        <span className="text-white/70 text-sm font-semibold">{count}</span>
                        <span className="text-white/50 text-xs">({percentage.toFixed(1)}%)</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
      <Footer />
    </GlassBackground>
  );
}


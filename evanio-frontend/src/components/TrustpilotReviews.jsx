import { Star, Quote, Verified } from 'lucide-react';
import { GlassCard } from './GlassCard';

const trustpilotReviews = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    rating: 5,
    date: '2 days ago',
    review: 'Evanio made starting my business incredibly smooth. The team was professional, responsive, and handled everything from formation to payment setup. Highly recommend!',
    service: 'Business Formation',
    verified: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    date: '5 days ago',
    review: 'The website they built for us exceeded all expectations. Modern design, fast loading, and perfect SEO. Our traffic increased by 300% in the first month!',
    service: 'Website Development',
    verified: true,
  },
  {
    id: 3,
    name: 'Emma Thompson',
    rating: 5,
    date: '1 week ago',
    review: 'Our new brand identity perfectly captures our vision. The logo design process was collaborative and the final result is stunning. Couldn\'t be happier!',
    service: 'Logo & Branding',
    verified: true,
  },
  {
    id: 4,
    name: 'David Rodriguez',
    rating: 5,
    date: '1 week ago',
    review: 'Setting up payment processing was a nightmare until I found Evanio. They integrated multiple gateways, handled all the compliance, and we were live in days!',
    service: 'Payment Gateway Setup',
    verified: true,
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    rating: 5,
    date: '2 weeks ago',
    review: 'Their digital marketing strategy transformed our business. We saw a 250% ROI in the first quarter. The team is knowledgeable, creative, and results-driven.',
    service: 'Digital Marketing',
    verified: true,
  },
  {
    id: 6,
    name: 'James Wilson',
    rating: 5,
    date: '2 weeks ago',
    review: 'The AI automation they set up saved us 20+ hours per week. Our workflows are now streamlined, and we can focus on growth instead of repetitive tasks.',
    service: 'AI Automation',
    verified: true,
  },
  {
    id: 7,
    name: 'Rachel Brown',
    rating: 5,
    date: '3 weeks ago',
    review: 'Outstanding service from start to finish. They helped us form our LLC, set up our website, and get our payment system running. Everything was done on time and perfectly.',
    service: 'Business Formation',
    verified: true,
  },
  {
    id: 8,
    name: 'Thomas Lee',
    rating: 5,
    date: '3 weeks ago',
    review: 'Professional, efficient, and results-oriented. The team at Evanio understands business needs and delivers solutions that actually work. Worth every penny!',
    service: 'Website Development',
    verified: true,
  },
  {
    id: 9,
    name: 'Amanda Garcia',
    rating: 5,
    date: '1 month ago',
    review: 'Best decision we made for our startup. Evanio handled all the complex paperwork, legal requirements, and technical setup. We could focus on building our product.',
    service: 'Business Formation',
    verified: true,
  },
];

export const TrustpilotReviews = () => {

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Star className="w-6 h-6 text-green-400 fill-green-400" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Reviews From Trustpilot
            </h2>
          </div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4">
            See what our clients are saying about us on Trustpilot
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white/90 font-semibold ml-2 text-xl">5.0</span>
            <span className="text-white/70 text-sm ml-2">({trustpilotReviews.length} reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {trustpilotReviews.map((review, index) => (
            <GlassCard
              key={review.id}
              className="p-6 flex flex-col group hover:scale-[1.02] transition-all duration-300 border-2 border-transparent hover:border-green-400/30 relative overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Premium Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-white text-lg">{review.name}</h3>
                      {review.verified && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 border border-green-400/30 rounded-full">
                          <Verified className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-300 font-semibold">Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-white/60">{review.date}</p>
                  </div>
                  <Quote className="w-6 h-6 text-green-400/50 flex-shrink-0" />
                </div>

                {/* Review Text */}
                <div className="relative mb-4 flex-grow">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-green-400/20" />
                  <p className="text-white/90 text-sm leading-relaxed relative z-10">
                    {review.review}
                  </p>
                </div>

                {/* Service Badge */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-300 font-medium">
                    {review.service}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Trustpilot Badge */}
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/15 transition-all">
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-sm text-white/90 font-medium">Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  );
};


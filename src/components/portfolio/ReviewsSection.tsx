import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Quote, User, Building } from "lucide-react";
import { fetchReviews, submitReview } from "@/services/api";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    rating: 5,
    review_text: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews(1, 6);
        setReviews(data);
        setHasMore(data.length === 6);
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, []);

  const loadMoreReviews = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await fetchReviews(nextPage, 6);
      setReviews(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === 6);
    } catch (error) {
      console.error('Failed to load more reviews:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitReview(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', position: '', rating: 5, review_text: '' });
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
      />
    ));
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client <span className="text-gradient">Reviews</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What colleagues and clients say about working with me
          </p>
        </div>

        {/* Debug Info */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground">
            Loading: {loading ? 'Yes' : 'No'} | Reviews: {reviews.length}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loading ? (
            <div className="col-span-full text-center">
              <p className="text-muted-foreground">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="col-span-full text-center">
              <p className="text-muted-foreground">No reviews found.</p>
            </div>
          ) : (
            reviews.map((review: any) => (
            <div key={review.id} className="glass-card rounded-2xl p-6 relative">
              <Quote className="h-8 w-8 text-primary/30 absolute top-4 right-4" />
              
              <div className="flex items-center gap-2 mb-4">
                {renderStars(review.rating)}
              </div>
              
              <p className="text-muted-foreground mb-6 line-clamp-4">
                "{review.review_text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {review.position && <span>{review.position}</span>}
                    {review.company && (
                      <>
                        <Building className="h-3 w-3" />
                        <span>{review.company}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {!loading && reviews.length > 0 && hasMore && (
          <div className="text-center mb-8">
            <button
              onClick={loadMoreReviews}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 px-6 py-3 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0 disabled:opacity-50"
            >
              {loadingMore ? 'Loading...' : 'Load More Reviews'}
            </button>
          </div>
        )}

        {/* Add Review Button */}
        <div className="text-center">
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0"
            >
              Leave a Review
            </button>
          ) : (
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6">Share Your Experience</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    className="glass border-0"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    className="glass border-0"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="company"
                    placeholder="Company (Optional)"
                    className="glass border-0"
                    value={formData.company}
                    onChange={handleChange}
                  />
                  <Input
                    name="position"
                    placeholder="Position (Optional)"
                    className="glass border-0"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: i + 1 })}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${i < formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <Textarea
                  name="review_text"
                  placeholder="Share your experience working with me..."
                  rows={4}
                  className="glass border-0 resize-none"
                  value={formData.review_text}
                  onChange={handleChange}
                  required
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0 flex-1 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 glass bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all duration-300 border-0"
                  >
                    Cancel
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <div className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-2xl">
                    <p className="text-green-400 font-medium">
                      ✅ Thank you! Your review has been submitted for approval.
                    </p>
                    <p className="text-green-300 text-sm mt-1">
                      It will appear on the site once reviewed.
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center">
                    Failed to submit review. Please try again.
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
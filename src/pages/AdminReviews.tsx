import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Check, X, Eye, LogOut } from "lucide-react";
import axios from 'axios';
import { useAuth } from '@/components/auth/AuthProvider';
import LoginForm from '@/components/auth/LoginForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://vic.dita.co.ke';
const API_KEY = import.meta.env.VITE_BACKEND_API_KEY;

const AdminReviews = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPendingReviews();
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const fetchPendingReviews = async () => {
    try {
      const url = `${API_BASE_URL.replace(/\/$/, '')}/api/reviews/pending`;
      const response = await axios.get(url, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      const reviews = response.data || [];
      setPendingReviews(reviews);
    } catch (error) {
      console.error('Error fetching pending reviews:', error);
      console.error('Error details:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await axios.put(`${API_BASE_URL.replace(/\/$/, '')}/api/reviews/${id}/approve`, {}, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      setPendingReviews(prev => prev.filter((review: any) => review.id !== id));
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL.replace(/\/$/, '')}/api/reviews/${id}`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      setPendingReviews(prev => prev.filter((review: any) => review.id !== id));
    } catch (error) {
      console.error('Error rejecting review:', error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading pending reviews...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gradient">Review Administration</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {pendingReviews.length} reviews pending approval
            </p>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            className="glass bg-white/10 hover:bg-white/20 text-white border-0 self-start sm:self-auto rounded-xl px-4 py-2"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sign Out</span>
            <span className="sm:hidden">Exit</span>
          </Button>
        </div>

        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-lg">Loading...</p>
          </Card>
        ) : pendingReviews.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Eye className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gradient">All Caught Up!</h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base px-4">
                No pending reviews at the moment. New submissions will appear here for your approval.
              </p>
              <div className="glass-card rounded-2xl p-4 sm:p-6 mx-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="w-8 h-8 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Reviews Approved</p>
                    <p className="text-lg sm:text-xl font-bold text-green-400">0</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Pending</p>
                    <p className="text-lg sm:text-xl font-bold text-yellow-400">0</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-medium">Rejected</p>
                    <p className="text-lg sm:text-xl font-bold text-red-400">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingReviews.map((review: any) => (
              <Card key={review.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.email}</p>
                    {review.company && (
                      <p className="text-sm text-muted-foreground">
                        {review.position} at {review.company}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-foreground leading-relaxed">"{review.review_text}"</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="inline-flex items-center gap-2 px-6 py-3 glass bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-2xl transition-all duration-300 border-0"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(review.id)}
                    className="inline-flex items-center gap-2 px-6 py-3 glass bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-2xl transition-all duration-300 border-0"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Check, X, Eye } from "lucide-react";
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
console.log('Admin API_BASE_URL:', API_BASE_URL);

const AdminReviews = () => {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  console.log('Current pendingReviews state:', pendingReviews);
  console.log('Current loading state:', loading);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const url = `${API_BASE_URL.replace(/\/$/, '')}/api/reviews/pending`;
      console.log('Fetching pending reviews from:', url);
      const response = await axios.get(url);
      console.log('Pending reviews response:', response.data);
      console.log('Response type:', typeof response.data);
      console.log('Is array:', Array.isArray(response.data));
      const reviews = response.data || [];
      console.log('Setting pendingReviews to:', reviews);
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
      await axios.put(`${API_BASE_URL.replace(/\/$/, '')}/api/reviews/${id}/approve`);
      setPendingReviews(prev => prev.filter((review: any) => review.id !== id));
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL.replace(/\/$/, '')}/api/reviews/${id}`);
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Review Administration</h1>
          <p className="text-muted-foreground">
            {pendingReviews.length} reviews pending approval
          </p>
        </div>

        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-lg">Loading...</p>
          </Card>
        ) : pendingReviews.length === 0 ? (
          <Card className="p-8 text-center">
            <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg">No pending reviews</p>
          </Card>
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
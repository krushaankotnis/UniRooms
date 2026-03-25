import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Star, User, MessageSquare } from 'lucide-react';
import { Page, Hostel } from '../App';

interface ReviewsPageProps {
  navigateTo: (page: Page) => void;
  hostel: Hostel | null;
}

export function ReviewsPage({ navigateTo, hostel }: ReviewsPageProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Please select a hostel first</h2>
          <Button onClick={() => navigateTo('search-browse')}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    console.log('Review submitted:', {
      hostel: hostel.name,
      rating,
      reviewText,
      reviewerName,
      date: new Date().toISOString().split('T')[0]
    });
    
    alert('Thank you for your review! It will be published after moderation.');
    navigateTo('hostel-details');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigateTo('hostel-details')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hostel Details
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <p className="text-gray-600">Share your experience to help other students</p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="reviewerName">Your Name *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="reviewerName"
                        required
                        placeholder="Enter your name"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Rating *</Label>
                    <div className="flex items-center space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="text-2xl focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (hoveredRating || rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {rating > 0 && (
                          <>
                            {rating === 1 && 'Poor'}
                            {rating === 2 && 'Fair'}
                            {rating === 3 && 'Good'}
                            {rating === 4 && 'Very Good'}
                            {rating === 5 && 'Excellent'}
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reviewText">Your Review *</Label>
                    <Textarea
                      id="reviewText"
                      required
                      placeholder="Share your experience about the hostel facilities, staff, location, cleanliness, etc."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="mt-1 min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 50 characters ({reviewText.length}/50)
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Review Guidelines</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Be honest and fair in your review</li>
                      <li>• Focus on your personal experience</li>
                      <li>• Avoid offensive language or personal attacks</li>
                      <li>• Include specific details about facilities and services</li>
                    </ul>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={reviewText.length < 50}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Hostel Summary & Existing Reviews */}
          <div className="space-y-6">
            {/* Hostel Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Reviewing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <h3 className="font-medium mb-2">{hostel.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{hostel.location}</p>
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 mr-1 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg mr-2">{hostel.rating}</span>
                    <span className="text-gray-600">({hostel.reviews.length} reviews)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hostel.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs text-blue-600">{review.studentName[0]}</span>
                          </div>
                          <span className="text-sm">{review.studentName}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                    </div>
                  ))}
                  
                  {hostel.reviews.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No reviews yet</p>
                      <p className="text-xs">Be the first to review!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Rating Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Rating Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = hostel.reviews.filter(r => r.rating === stars).length;
                    const percentage = hostel.reviews.length > 0 ? (count / hostel.reviews.length) * 100 : 0;
                    
                    return (
                      <div key={stars} className="flex items-center space-x-2">
                        <span className="text-sm w-8">{stars}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
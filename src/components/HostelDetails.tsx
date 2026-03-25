import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Star, MapPin, Wifi, Car, Coffee, Shield, Calendar, MessageSquare, Users } from 'lucide-react';
import { Page, Hostel } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HostelDetailsProps {
  navigateTo: (page: Page) => void;
  hostel: Hostel | null;
}

export function HostelDetails({ navigateTo, hostel }: HostelDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // ✅ Prevent blank page if hostel is missing
  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Hostel not found</h2>
          <Button onClick={() => navigateTo('search-browse')}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi': return <Wifi className="w-4 h-4" />;
      case 'Parking': return <Car className="w-4 h-4" />;
      case 'Cafeteria': return <Coffee className="w-4 h-4" />;
      case 'Security': return <Shield className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  // ✅ Handle booking click and preserve hostel data
  const handleBookNow = () => {
    localStorage.setItem('selectedHostel', JSON.stringify(hostel));
    navigateTo('booking');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigateTo('search-browse')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-96">
                  <ImageWithFallback
                    src={hostel.images?.[selectedImageIndex] || hostel.image}
                    alt={hostel.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  {hostel.images && hostel.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 flex space-x-2">
                      {hostel.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === selectedImageIndex ? 'bg-white' : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {hostel.images && hostel.images.length > 1 && (
                  <div className="p-4 flex space-x-2 overflow-x-auto">
                    {hostel.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          index === selectedImageIndex ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${hostel.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hostel Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{hostel.name}</CardTitle>
                    <p className="text-gray-600 flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      {hostel.location}
                    </p>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg mr-2">{hostel.rating}</span>
                      <span className="text-gray-600">
                        ({hostel.reviews?.length || 0} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl text-blue-600 mb-1">₹{hostel.price}</div>
                    <div className="text-gray-600">per month</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <h3 className="mb-3">Description</h3>
                  <p className="text-gray-700">{hostel.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {hostel.amenities?.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hostel.reviews?.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-4 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm text-blue-600">
                              {review.studentName[0]}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm">{review.studentName}</p>
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
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => navigateTo('reviews')}
                    className="w-full"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Write a Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">Monthly Rent</span>
                    <span className="text-2xl text-blue-600">₹{hostel.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Security deposit may apply
                  </p>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleBookNow}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>Free cancellation within 24 hours</p>
                </div>
              </CardContent>
            </Card>

            {/* Map Card */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Interactive Map</p>
                    <p className="text-xs">Google Maps integration</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hostel.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

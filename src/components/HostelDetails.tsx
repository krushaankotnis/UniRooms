import React, { useEffect, useState } from "react";
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Star, MapPin, Wifi, Car, Coffee, Shield, Calendar, MessageSquare, Users } from 'lucide-react';
import { Page, Hostel } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface HostelDetailsProps {
  navigateTo: (page: Page) => void;
  hostel: Hostel | null;
}

export function HostelDetails({ navigateTo, hostel }: HostelDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);

  // 🔥 FETCH REVIEWS FROM FIREBASE
  useEffect(() => {
    const fetchReviews = async () => {
      const snapshot = await getDocs(collection(db, "reviews"));

      const data = snapshot.docs
        .map(doc => doc.data())
        .filter((r: any) => r.hostelId === hostel?.id);

      setReviews(data);
    };

    fetchReviews();
  }, [hostel]);

  // ❗ Prevent blank page
  if (!hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => navigateTo('search-browse')}>
          Back to Search
        </Button>
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

  const handleBookNow = () => {
    localStorage.setItem('selectedHostel', JSON.stringify(hostel));
    navigateTo('booking');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        <Button variant="ghost" onClick={() => navigateTo('search-browse')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8 mt-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* IMAGE */}
            <Card>
              <CardContent className="p-0">
                <ImageWithFallback
                  src={hostel.images?.[selectedImageIndex] || hostel.image}
                  alt={hostel.name}
                  className="w-full h-96 object-cover"
                />
              </CardContent>
            </Card>

            {/* INFO */}
            <Card>
              <CardHeader>
                <CardTitle>{hostel.name}</CardTitle>

                <p className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {hostel.location}
                </p>

                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-yellow-400 w-5 h-5 mr-1" />
                  {hostel.rating}
                  <span className="ml-2 text-gray-500">
                    ({reviews.length} reviews)
                  </span>
                </div>

                <div className="text-2xl text-blue-600">
                  ₹{hostel.price}/month
                </div>
              </CardHeader>

              <CardContent>
                <p className="mb-4">{hostel.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  {hostel.amenities?.map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {getAmenityIcon(a)}
                      {a}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 🔥 REVIEWS */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                {reviews.length === 0 ? (
                  <p className="text-gray-500">No reviews yet</p>
                ) : (
                  reviews.map((review, i) => (
                    <div key={i} className="border-b pb-3">

                      <p className="font-medium">{review.studentName}</p>

                      <div className="flex">
                        {[...Array(5)].map((_, idx) => (
                          <span key={idx}>
                            {idx < review.rating ? "⭐" : "☆"}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-gray-600">{review.comment}</p>
                      <p className="text-xs text-gray-400">{review.date}</p>

                    </div>
                  ))
                )}

                <Button
                  variant="outline"
                  onClick={() => navigateTo('reviews')}
                  className="w-full"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Write Review
                </Button>

              </CardContent>
            </Card>

          </div>

          {/* RIGHT */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
              </CardHeader>

              <CardContent>

                <p className="text-lg mb-2">₹{hostel.price}/month</p>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleBookNow}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
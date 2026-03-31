import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Star } from 'lucide-react';
import { Page, Hostel } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Firebase
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface SearchBrowseProps {
  navigateTo: (page: Page) => void;
  selectHostel: (hostel: Hostel) => void;
}

export function SearchBrowse({ navigateTo, selectHostel }: SearchBrowseProps) {

  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM FIREBASE (NOW CLEAN — YOUR DB IS FIXED)
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const snapshot = await getDocs(collection(db, "hostels"));

        const data: Hostel[] = snapshot.docs.map(doc => {
          const d: any = doc.data();

          return {
            id: doc.id,
            name: d.name || "No Name",
            location: d.location || "Unknown",
            price: d.price || 0,
            rating: d.rating || 4,
            distance: d.distance || "",
            image: d.image || "https://via.placeholder.com/300",
            amenities: d.amenities || [], // ✅ now direct array
            description: d.description || "",
            images: d.images || [],
            reviews: d.reviews || []
          };
        });

        console.log("HOSTELS:", data);
        setHostels(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  return (
    <div className="min-h-screen p-6">

      <h2 className="text-2xl mb-4">Available Hostels</h2>

      <p className="mb-4 text-gray-500">
        {hostels.length} hostels found
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {loading ? (
          <p>Loading...</p>
        ) : hostels.length === 0 ? (
          <p>No hostels found</p>
        ) : (
          hostels.map((hostel) => (

            <Card
              key={hostel.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => {
                selectHostel(hostel);
                navigateTo('hostel-details');
              }}
            >

              <div className="h-48">
                <ImageWithFallback
                  src={hostel.image}
                  alt={hostel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>{hostel.name}</span>
                  <span className="text-blue-600">₹{hostel.price}/mo</span>
                </CardTitle>

                <p className="text-sm flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {hostel.location}
                </p>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-2">
                  {hostel.amenities.slice(0, 3).map((a, i) => (
                    <Badge key={i}>{a}</Badge>
                  ))}
                </div>

                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  {hostel.rating}
                </div>
              </CardContent>

            </Card>

          ))
        )}

      </div>

    </div>
  );
}
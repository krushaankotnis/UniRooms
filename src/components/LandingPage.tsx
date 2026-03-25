import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Star, Users, Wifi, Car, Coffee, Shield, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
import { Page, UserType, Hostel } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  navigateTo: (page: Page) => void;
  selectUserType: (type: UserType) => void;
  selectHostel: (hostel: Hostel) => void;
}

const mockHostels: Hostel[] = [
  {
    id: '1',
    name: 'BlueStone Hostel',
    location: 'Near MIT College, 0.5 km',
    price: 8500,
    rating: 4.5,
    distance: '0.5 km',
    image: 'https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBiZWRyb29tfGVufDF8fHx8MTc1Nzk0Njk0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['WiFi', 'AC', 'Laundry', 'Kitchen'],
    description: 'Modern hostel with excellent facilities for students.',
    images: [
      'https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBiZWRyb29tfGVufDF8fHx8MTc1Nzk0Njk0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1715310306143-787865a1b538?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3N0ZWwlMjBjb21tb24lMjBhcmVhfGVufDF8fHx8MTc1ODAxNDk5NHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    reviews: [
      { id: '1', studentName: 'Rahul S.', rating: 5, comment: 'Great place with excellent facilities!', date: '2024-01-15' },
      { id: '2', studentName: 'Priya M.', rating: 4, comment: 'Clean and comfortable rooms.', date: '2024-01-10' }
    ]
  },
  {
    id: '2',
    name: 'Green Valley Residence',
    location: 'Near Delhi University, 1.2 km',
    price: 7200,
    rating: 4.2,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1571474039046-42bc4e7f4b98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYWNjb21tb2RhdGlvbiUyMHJvb218ZW58MXx8fHwxNzU4MDE0OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['WiFi', 'Parking', 'Security', 'Cafeteria'],
    description: 'Affordable accommodation with good security.',
    images: [
      'https://images.unsplash.com/photo-1571474039046-42bc4e7f4b98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYWNjb21tb2RhdGlvbiUyMHJvb218ZW58MXx8fHwxNzU4MDE0OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    reviews: [
      { id: '3', studentName: 'Ankit K.', rating: 4, comment: 'Good value for money.', date: '2024-01-08' }
    ]
  },
  {
    id: '3',
    name: 'Campus Lodge',
    location: 'Near IIT Campus, 2.1 km',
    price: 9200,
    rating: 4.8,
    distance: '2.1 km',
    image: 'https://images.unsplash.com/photo-1552933440-440952890413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwaG9zdGVsJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU4MDE0OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['WiFi', 'Gym', 'Study Room', 'AC'],
    description: 'Premium hostel with modern amenities.',
    images: [
      'https://images.unsplash.com/photo-1552933440-440952890413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwaG9zdGVsJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU4MDE0OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    reviews: [
      { id: '4', studentName: 'Sneha P.', rating: 5, comment: 'Excellent facilities and staff!', date: '2024-01-12' }
    ]
  }
];

export function LandingPage({ navigateTo, selectUserType, selectHostel }: LandingPageProps) {
  const [showChoiceScreen, setShowChoiceScreen] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState([5000, 15000]);
  const [distanceFilter, setDistanceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const handleUserTypeSelection = (type: UserType) => {
    selectUserType(type);
    setShowChoiceScreen(false);
  };

  const handleGetStarted = () => {
    setShowChoiceScreen(false);
  };

  if (showChoiceScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-3xl mb-4 text-gray-900">Welcome to UniRooms</h1>
            <p className="text-lg text-gray-600 mb-8">Choose your role to get started</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700"
              onClick={() => handleUserTypeSelection('student')}
            >
              <Users className="mr-3 h-6 w-6" />
              I am a Student
            </Button>
            
            <Button 
              variant="outline"
              className="w-full h-16 text-lg border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => handleUserTypeSelection('owner')}
            >
              <Shield className="mr-3 h-6 w-6" />
              I am a Hostel Owner
            </Button>
          </div>

          <div className="pt-4">
            <Button 
              variant="ghost" 
              onClick={handleGetStarted}
              className="text-blue-600 hover:text-blue-700"
            >
              Just browse for now →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl mb-6">
              Find Your Perfect Hostel, Anytime, Anywhere
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Discover comfortable and affordable student accommodation near your campus
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter location or college name"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-11"
                    />
                  </div>
                </div>
                
                <Select value={distanceFilter} onValueChange={setDistanceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2km">Within 2 km</SelectItem>
                    <SelectItem value="5km">Within 5 km</SelectItem>
                    <SelectItem value="10km">Within 10 km</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4+">4+ Stars</SelectItem>
                    <SelectItem value="3+">3+ Stars</SelectItem>
                    <SelectItem value="2+">2+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-2 text-gray-700">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={20000}
                  min={3000}
                  step={500}
                  className="w-full"
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2 h-5 w-5" />
                Search Hostels
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Hostels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Featured Hostels</h2>
            <p className="text-lg text-gray-600">
              Discover top-rated accommodations near popular colleges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockHostels.map((hostel) => (
              <Card 
                key={hostel.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => selectHostel(hostel)}
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={hostel.image}
                    alt={hostel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {hostel.rating}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{hostel.name}</span>
                    <span className="text-lg text-blue-600">₹{hostel.price}/mo</span>
                  </CardTitle>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hostel.location}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hostel.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity === 'WiFi' && <Wifi className="w-3 h-3 mr-1" />}
                        {amenity === 'Parking' && <Car className="w-3 h-3 mr-1" />}
                        {amenity === 'Cafeteria' && <Coffee className="w-3 h-3 mr-1" />}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  {hostel.reviews.length > 0 && (
                    <div className="text-sm text-gray-600 italic">
                      "{hostel.reviews[0].comment}" - {hostel.reviews[0].studentName}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => navigateTo('search-browse')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              View All Hostels
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">UniRooms</h3>
              <p className="text-gray-400 text-sm">
                Your trusted platform for finding the perfect student accommodation.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigateTo('about')} className="text-gray-400 hover:text-white">About Us</button></li>
                <li><button onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-white">Contact</button></li>
                <li><span className="text-gray-400">FAQs</span></li>
                <li><span className="text-gray-400">Terms of Service</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>support@unirooms.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 UniRooms. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
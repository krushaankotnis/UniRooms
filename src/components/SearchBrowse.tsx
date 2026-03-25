import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Star, Grid, List, Wifi, Car, Coffee, Shield } from 'lucide-react';
import { Page, Hostel } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

// ✅ Firebase imports
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface SearchBrowseProps {
  navigateTo: (page: Page) => void;
  selectHostel: (hostel: Hostel) => void;
}

export function SearchBrowse({ navigateTo, selectHostel }: SearchBrowseProps) {
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState([5000, 15000]);
  const [distanceFilter, setDistanceFilter] = useState('any');
  const [ratingFilter, setRatingFilter] = useState('any');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // ✅ Hostels state (replaces mock data)
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch hostels from Firestore
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'hostels'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().hostelName || 'Unnamed Hostel',
          location: doc.data().location || 'Not specified',
          price: 8000, // 🔧 optional: default price since not stored yet
          rating: 4.5, // 🔧 optional static rating
          amenities: doc.data().amenities || [],
          description: doc.data().description || '',
          image: 'https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?auto=format&w=800',
          reviews: [],
        })) as Hostel[];

        setHostels(data);
        setFilteredHostels(data);
      } catch (err) {
        console.error('Error fetching hostels:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, []);

  // ✅ Filter logic
  const handleSearch = () => {
    let filtered = [...hostels];

    if (searchLocation) {
      filtered = filtered.filter(
        (hostel) =>
          hostel.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
          hostel.name.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (hostel) => hostel.price >= priceRange[0] && hostel.price <= priceRange[1]
    );

    if (ratingFilter && ratingFilter !== 'any') {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter((hostel) => hostel.rating >= minRating);
    }

    setFilteredHostels(filtered);
  };

  // ✅ Hostel card renderer
  const renderHostelCard = (hostel: Hostel) => (
    <Card
      key={hostel.id}
      className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
        viewMode === 'list' ? 'flex' : ''
      }`}
      onClick={() => {
        selectHostel(hostel);
        navigateTo('hostel-details');
      }}
    >
      <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-48'}`}>
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

      <div className="flex-1">
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
            {hostel.amenities.slice(0, 4).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity === 'WiFi' && <Wifi className="w-3 h-3 mr-1" />}
                {amenity === 'Parking' && <Car className="w-3 h-3 mr-1" />}
                {amenity === 'Cafeteria' && <Coffee className="w-3 h-3 mr-1" />}
                {amenity === 'Security' && <Shield className="w-3 h-3 mr-1" />}
                {amenity}
              </Badge>
            ))}
          </div>
          {hostel.description && (
            <div className="text-sm text-gray-600 italic">
              {hostel.description.slice(0, 60)}...
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );

  // ✅ UI Render
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading hostels...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by location or hostel name"
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
                  <SelectItem value="any">Any Distance</SelectItem>
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
                  <SelectItem value="any">Any Rating</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="2">2+ Stars</SelectItem>
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

            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-5 w-5" />
              Search Hostels
            </Button>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl mb-2">Available Hostels</h1>
            <p className="text-gray-600">
              {filteredHostels.length} hostel{filteredHostels.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        <div
          className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }`}
        >
          {filteredHostels.map(renderHostelCard)}
        </div>

        {filteredHostels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">
              No hostels found matching your criteria.
            </p>
            <Button
              onClick={() => {
                setSearchLocation('');
                setPriceRange([5000, 15000]);
                setDistanceFilter('any');
                setRatingFilter('any');
                setFilteredHostels(hostels);
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

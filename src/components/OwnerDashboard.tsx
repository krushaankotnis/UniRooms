import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Edit, 
  Eye, 
  Calendar, 
  Users, 
  Star, 
  MessageSquare, 
  IndianRupee,
  Building2,
  MapPin,
  Phone,
  Mail,
  Settings
} from 'lucide-react';
import { Page } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OwnerDashboardProps {
  navigateTo: (page: Page) => void;
}

// Mock data for owner's hostels
const mockHostels = [
  {
    id: '1',
    name: 'BlueStone Hostel',
    location: 'Near MIT College, 0.5 km',
    price: 8500,
    rating: 4.5,
    totalReviews: 23,
    occupancy: 85,
    totalRooms: 50,
    occupiedRooms: 42,
    image: 'https://images.unsplash.com/photo-1609587639086-b4cbf85e4355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3N0ZWwlMjBiZWRyb29tfGVufDF8fHx8MTc1Nzk0Njk0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'active',
    monthlyRevenue: 357000
  },
  {
    id: '2',
    name: 'Green Valley Residence',
    location: 'Near Delhi University, 1.2 km',
    price: 7200,
    rating: 4.2,
    totalReviews: 18,
    occupancy: 92,
    totalRooms: 35,
    occupiedRooms: 32,
    image: 'https://images.unsplash.com/photo-1571474039046-42bc4e7f4b98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYWNjb21tb2RhdGlvbiUyMHJvb218ZW58MXx8fHwxNzU4MDE0OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'active',
    monthlyRevenue: 230400
  }
];

const mockBookings = [
  {
    id: '1',
    studentName: 'Rahul Sharma',
    hostelName: 'BlueStone Hostel',
    roomType: 'Single Room',
    checkIn: '2024-02-01',
    duration: '6 months',
    amount: 51000,
    status: 'confirmed',
    studentEmail: 'rahul@email.com',
    studentPhone: '+91 98765 43210'
  },
  {
    id: '2',
    studentName: 'Priya Patel',
    hostelName: 'Green Valley Residence',
    roomType: 'Shared Room',
    checkIn: '2024-02-15',
    duration: '12 months',
    amount: 86400,
    status: 'pending',
    studentEmail: 'priya@email.com',
    studentPhone: '+91 87654 32109'
  },
  {
    id: '3',
    studentName: 'Ankit Kumar',
    hostelName: 'BlueStone Hostel',
    roomType: 'Dormitory',
    checkIn: '2024-01-20',
    duration: '3 months',
    amount: 25500,
    status: 'confirmed',
    studentEmail: 'ankit@email.com',
    studentPhone: '+91 76543 21098'
  }
];

const mockReviews = [
  {
    id: '1',
    studentName: 'Sneha Reddy',
    hostelName: 'BlueStone Hostel',
    rating: 5,
    comment: 'Excellent facilities and very clean rooms. The staff is also very helpful.',
    date: '2024-01-15',
    status: 'published'
  },
  {
    id: '2',
    studentName: 'Vikram Singh',
    hostelName: 'Green Valley Residence',
    rating: 4,
    comment: 'Good location and decent facilities. Could improve the WiFi speed.',
    date: '2024-01-12',
    status: 'pending'
  }
];

export function OwnerDashboard({ navigateTo }: OwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const totalRevenue = mockHostels.reduce((sum, hostel) => sum + hostel.monthlyRevenue, 0);
  const totalRooms = mockHostels.reduce((sum, hostel) => sum + hostel.totalRooms, 0);
  const occupiedRooms = mockHostels.reduce((sum, hostel) => sum + hostel.occupiedRooms, 0);
  const averageOccupancy = Math.round((occupiedRooms / totalRooms) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Manage your hostels and bookings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl text-green-600">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <IndianRupee className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Hostels</p>
                  <p className="text-2xl text-blue-600">{mockHostels.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Occupancy Rate</p>
                  <p className="text-2xl text-purple-600">{averageOccupancy}%</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New Bookings</p>
                  <p className="text-2xl text-orange-600">{mockBookings.filter(b => b.status === 'pending').length}</p>
                </div>
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hostels">My Hostels</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{booking.studentName}</p>
                          <p className="text-sm text-gray-600">{booking.hostelName}</p>
                          <p className="text-sm text-gray-500">{booking.checkIn}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{booking.amount.toLocaleString()}</p>
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Hostel Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockHostels.map((hostel) => (
                      <div key={hostel.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{hostel.name}</h4>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{hostel.rating}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Occupancy</p>
                            <p className="font-medium">{hostel.occupancy}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Revenue</p>
                            <p className="font-medium">₹{hostel.monthlyRevenue.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hostels" className="mt-6">
            <div className="mb-6">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Hostel
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockHostels.map((hostel) => (
                <Card key={hostel.id}>
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={hostel.image}
                      alt={hostel.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {hostel.rating}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{hostel.name}</span>
                      <Badge variant={hostel.status === 'active' ? 'default' : 'secondary'}>
                        {hostel.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hostel.location}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Rent</p>
                        <p className="font-medium">₹{hostel.price}/mo</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Occupancy</p>
                        <p className="font-medium">{hostel.occupiedRooms}/{hostel.totalRooms}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium mb-1">{booking.studentName}</h4>
                            <p className="text-sm text-gray-600 flex items-center mb-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {booking.studentEmail}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {booking.studentPhone}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600">Hostel</p>
                            <p className="font-medium mb-1">{booking.hostelName}</p>
                            <p className="text-sm text-gray-600">{booking.roomType}</p>
                            <p className="text-sm text-gray-600">Check-in: {booking.checkIn}</p>
                            <p className="text-sm text-gray-600">Duration: {booking.duration}</p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-medium text-green-600 mb-2">
                              ₹{booking.amount.toLocaleString()}
                            </p>
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                              className="mb-2"
                            >
                              {booking.status}
                            </Badge>
                            {booking.status === 'pending' && (
                              <div className="flex space-x-2">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline">
                                  Decline
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{review.studentName}</h4>
                            <p className="text-sm text-gray-600">{review.hostelName}</p>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={review.status === 'published' ? 'default' : 'secondary'}>
                              {review.status}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">"{review.comment}"</p>
                        {review.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline">
                              Reject
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
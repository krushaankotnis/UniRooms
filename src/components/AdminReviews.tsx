import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AdminLayout } from './AdminLayout';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Page } from '../App';
import { Search, MoreVertical, Eye, Trash2, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface AdminReviewsProps {
  navigateTo: (page: Page) => void;
  logout: () => void;
}

export function AdminReviews({ navigateTo, logout }: AdminReviewsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  // Mock review data
  const reviews = [
    { 
      id: 1, 
      hostelName: 'Sunshine Hostel', 
      student: 'John Smith', 
      rating: 5, 
      comment: 'Excellent hostel with great facilities. The staff is very friendly and helpful. Highly recommended!', 
      date: '2024-06-15',
      status: 'Published'
    },
    { 
      id: 2, 
      hostelName: 'Green Valley Hostel', 
      student: 'Sarah Johnson', 
      rating: 4, 
      comment: 'Good location and clean rooms. WiFi could be better but overall a great experience.', 
      date: '2024-06-18',
      status: 'Published'
    },
    { 
      id: 3, 
      hostelName: 'Lake View Hostel', 
      student: 'Lisa Anderson', 
      rating: 5, 
      comment: 'Beautiful view and peaceful environment. Perfect for students who want to focus on studies.', 
      date: '2024-06-20',
      status: 'Published'
    },
    { 
      id: 4, 
      hostelName: 'City Center Hostel', 
      student: 'Michael Brown', 
      rating: 2, 
      comment: 'This place is terrible! Dirty rooms and rude staff. Not worth the money. Would not recommend to anyone.', 
      date: '2024-06-22',
      status: 'Flagged'
    },
    { 
      id: 5, 
      hostelName: 'Star Hostel', 
      student: 'Jennifer Martinez', 
      rating: 4, 
      comment: 'Nice hostel with modern amenities. Food quality is good. Only downside is limited parking space.', 
      date: '2024-06-25',
      status: 'Published'
    },
    { 
      id: 6, 
      hostelName: 'Riverside Hostel', 
      student: 'David Wilson', 
      rating: 5, 
      comment: 'One of the best hostels I have stayed in. Great community and the owners are very accommodating.', 
      date: '2024-06-28',
      status: 'Published'
    },
    { 
      id: 7, 
      hostelName: 'Mountain Peak Hostel', 
      student: 'Amanda Thomas', 
      rating: 3, 
      comment: 'Average hostel. Nothing special but gets the job done. Could use some maintenance work.', 
      date: '2024-06-30',
      status: 'Published'
    },
    { 
      id: 8, 
      hostelName: 'Sunshine Hostel', 
      student: 'Robert Taylor', 
      rating: 1, 
      comment: 'Absolutely horrible! Scam alert! The photos online are fake and the actual place is disgusting!', 
      date: '2024-07-01',
      status: 'Flagged'
    },
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

  const handleDelete = (reviewId: number) => {
    console.log('Delete review:', reviewId);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout activePage="admin-reviews" navigateTo={navigateTo} logout={logout}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl mb-2">Reviews & Feedback</h1>
          <p className="text-gray-600">Monitor and moderate user reviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="text-3xl mt-1">245</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <p className="text-3xl mt-1">4.3</p>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Flagged</p>
                  <p className="text-3xl mt-1">8</p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚩</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-3xl mt-1">42</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <CardTitle>All Reviews</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hostel</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>{review.hostelName}</TableCell>
                      <TableCell className="text-gray-600">{review.student}</TableCell>
                      <TableCell>{renderStars(review.rating)}</TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate text-gray-600">{review.comment}</p>
                      </TableCell>
                      <TableCell className="text-gray-600">{review.date}</TableCell>
                      <TableCell>
                        {review.status === 'Flagged' ? (
                          <Badge variant="destructive">Flagged</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700">Published</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Full Review
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(review.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Review
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

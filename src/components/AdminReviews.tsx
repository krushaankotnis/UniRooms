import React, { useState, useEffect } from 'react';
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

// 🔥 FIREBASE
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

interface AdminReviewsProps {
  navigateTo: (page: Page) => void;
  logout: () => void;
}

export function AdminReviews({ navigateTo, logout }: AdminReviewsProps) {

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewDocs, setReviewDocs] = useState<string[]>([]);

  // 🔥 FETCH REVIEWS FROM FIREBASE
  useEffect(() => {
    const fetchReviews = async () => {
      const snapshot = await getDocs(collection(db, "reviews"));

      setReviews(snapshot.docs.map(doc => doc.data()));
      setReviewDocs(snapshot.docs.map(doc => doc.id));
    };

    fetchReviews();
  }, []);

  // 🔥 DELETE REVIEW
  const handleDelete = async (index: number) => {
    const id = reviewDocs[index];
    await deleteDoc(doc(db, "reviews", id));
    window.location.reload();
  };

  // 🔍 FILTER
  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      review.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      filterRating === 'all' ||
      review.rating?.toString() === filterRating;

    return matchesSearch && matchesRating;
  });

  // ⭐ RENDER STARS
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <AdminLayout activePage="admin-reviews" navigateTo={navigateTo} logout={logout}>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl mb-2">Reviews & Feedback</h1>
          <p className="text-gray-600">Monitor and manage user reviews</p>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-3xl mt-1">{reviews.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-3xl mt-1">
                {reviews.length
                  ? (
                      reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
                      reviews.length
                    ).toFixed(1)
                  : 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">Low Ratings (≤2)</p>
              <p className="text-3xl mt-1">
                {reviews.filter(r => r.rating <= 2).length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-3xl mt-1">{reviews.length}</p>
            </CardContent>
          </Card>

        </div>

        {/* 🔍 SEARCH + FILTER */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <CardTitle>All Reviews</CardTitle>

              <div className="flex gap-3">

                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="5">5 Star</SelectItem>
                    <SelectItem value="4">4 Star</SelectItem>
                    <SelectItem value="3">3 Star</SelectItem>
                    <SelectItem value="2">2 Star</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>

              </div>
            </div>
          </CardHeader>

          {/* 📋 TABLE */}
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Hostel ID</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {filteredReviews.map((review, index) => (
                  <TableRow key={index}>

                    <TableCell>{review.studentName}</TableCell>

                    <TableCell>
                      {renderStars(review.rating)}
                    </TableCell>

                    <TableCell className="max-w-sm truncate">
                      {review.comment}
                    </TableCell>

                    <TableCell>{review.date}</TableCell>

                    <TableCell>{review.hostelId}</TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(index)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>

                      </DropdownMenu>
                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </CardContent>

        </Card>

      </div>
    </AdminLayout>
  );
}
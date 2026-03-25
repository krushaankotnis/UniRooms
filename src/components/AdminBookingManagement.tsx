import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AdminLayout } from "./AdminLayout";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Page } from "../App";
import {
  Search,
  MoreVertical,
  Eye,
  XCircle,
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// ✅ Firebase
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

interface AdminBookingManagementProps {
  navigateTo: (page: Page) => void;
  logout: () => void;
}

interface Booking {
  id: string;
  bookingId: string;
  hostelName: string;
  student: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: string;
}

export function AdminBookingManagement({
  navigateTo,
  logout,
}: AdminBookingManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const fetchedBookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          bookingId: doc.data().bookingId || "N/A",
          hostelName: doc.data().hostelName || "Unknown",
          student: doc.data().studentName || "Unknown",
          checkIn: doc.data().checkIn || "-",
          checkOut: doc.data().checkOut || "-",
          amount: doc.data().amount || 0,
          status: doc.data().status || "Pending",
        }));
        setBookings(fetchedBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ✅ Firestore actions
  const handleConfirm = async (bookingId: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: "Confirmed" });
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "Confirmed" } : b
        )
      );
    } catch (err) {
      console.error("Error confirming booking:", err);
    }
  };

  const handleCancel = async (bookingId: string) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status: "Cancelled" });
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch (err) {
      console.error("Error canceling booking:", err);
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-blue-100 text-blue-700">Confirmed</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <AdminLayout
        activePage="admin-bookings"
        navigateTo={navigateTo}
        logout={logout}
      >
        <div className="flex justify-center items-center h-screen text-gray-500">
          Loading bookings...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="admin-bookings" navigateTo={navigateTo} logout={logout}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl mb-2">Booking Management</h1>
          <p className="text-gray-600">Monitor and manage all hostel bookings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-3xl mt-1">{bookings.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">📅</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-3xl mt-1">
                    {bookings.filter((b) => b.status === "Confirmed").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-3xl mt-1">
                    {bookings.filter((b) => b.status === "Pending").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-3xl mt-1">
                    ₹
                    {bookings
                      .filter((b) => b.status === "Confirmed")
                      .reduce((sum, b) => sum + b.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <CardTitle>All Bookings</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          {/* Booking Table */}
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Hostel Name</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.bookingId}</TableCell>
                      <TableCell>{booking.hostelName}</TableCell>
                      <TableCell>{booking.student}</TableCell>
                      <TableCell>{booking.checkIn}</TableCell>
                      <TableCell>{booking.checkOut}</TableCell>
                      <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
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
                              View Details
                            </DropdownMenuItem>
                            {booking.status === "Pending" && (
                              <DropdownMenuItem
                                onClick={() => handleConfirm(booking.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                Confirm
                              </DropdownMenuItem>
                            )}
                            {(booking.status === "Pending" ||
                              booking.status === "Confirmed") && (
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleCancel(booking.id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancel
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(booking.id)}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

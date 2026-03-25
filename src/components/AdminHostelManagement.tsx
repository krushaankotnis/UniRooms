import React, { useState, useEffect } from "react";
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
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// ✅ Firebase imports
import { db } from "../firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

interface AdminHostelManagementProps {
  navigateTo: (page: Page) => void;
  logout: () => void;
}

interface Hostel {
  id: string;
  name: string;
  location: string;
  owner: string;
  status: string;
  price: number;
  rating: number;
}

export function AdminHostelManagement({
  navigateTo,
  logout,
}: AdminHostelManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch hostels from Firestore
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hostels"));
        const fetchedHostels = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Unnamed Hostel",
          location: doc.data().location || "Unknown",
          owner: doc.data().ownerName || "Unknown",
          status: doc.data().status || "Pending",
          price: doc.data().price || 0,
          rating: doc.data().rating || 0,
        }));
        setHostels(fetchedHostels);
      } catch (error) {
        console.error("Error fetching hostels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  // ✅ Firestore update actions
  const handleApprove = async (hostelId: string) => {
    try {
      await updateDoc(doc(db, "hostels", hostelId), { status: "Approved" });
      setHostels((prev) =>
        prev.map((h) => (h.id === hostelId ? { ...h, status: "Approved" } : h))
      );
    } catch (err) {
      console.error("Error approving hostel:", err);
    }
  };

  const handleReject = async (hostelId: string) => {
    try {
      await updateDoc(doc(db, "hostels", hostelId), { status: "Rejected" });
      setHostels((prev) =>
        prev.map((h) => (h.id === hostelId ? { ...h, status: "Rejected" } : h))
      );
    } catch (err) {
      console.error("Error rejecting hostel:", err);
    }
  };

  const handleDelete = async (hostelId: string) => {
    try {
      await deleteDoc(doc(db, "hostels", hostelId));
      setHostels((prev) => prev.filter((h) => h.id !== hostelId));
    } catch (err) {
      console.error("Error deleting hostel:", err);
    }
  };

  const filteredHostels = hostels.filter((hostel) => {
    const matchesSearch =
      hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || hostel.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <AdminLayout activePage="admin-hostels" navigateTo={navigateTo} logout={logout}>
        <div className="flex justify-center items-center h-screen text-gray-500">
          Loading hostels...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="admin-hostels" navigateTo={navigateTo} logout={logout}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl mb-2">Hostel Management</h1>
          <p className="text-gray-600">Manage hostel listings and approvals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Hostels</p>
                  <p className="text-3xl mt-1">{hostels.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏢</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-3xl mt-1">
                    {hostels.filter((h) => h.status === "Approved").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">✓</span>
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
                    {hostels.filter((h) => h.status === "Pending").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">⏳</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-3xl mt-1">
                    {hostels.filter((h) => h.status === "Rejected").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">✕</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <CardTitle>All Hostels</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search hostels..."
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
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
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
                    <TableHead>Hostel Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Price/Month</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredHostels.map((hostel) => (
                    <TableRow key={hostel.id}>
                      <TableCell>{hostel.name}</TableCell>
                      <TableCell className="text-gray-600">
                        {hostel.location}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {hostel.owner}
                      </TableCell>
                      <TableCell>₹{hostel.price.toLocaleString()}</TableCell>
                      <TableCell>
                        {hostel.rating > 0 ? (
                          <span className="flex items-center gap-1">
                            <span>⭐</span>
                            <span>{hostel.rating}</span>
                          </span>
                        ) : (
                          <span className="text-gray-400">No rating</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(hostel.status)}</TableCell>
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
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            {hostel.status === "Pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleApprove(hostel.id)}
                                >
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleReject(hostel.id)}
                                >
                                  <XCircle className="w-4 h-4 mr-2 text-red-600" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(hostel.id)}
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

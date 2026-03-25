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
import { Search, MoreVertical, Edit, Trash2, Ban, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// ✅ Firebase imports
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

interface AdminUserManagementProps {
  navigateTo: (page: Page) => void;
  logout: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

export function AdminUserManagement({ navigateTo, logout }: AdminUserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch live users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const studentsSnap = await getDocs(collection(db, "students"));
        const ownersSnap = await getDocs(collection(db, "users"));

        const fetchedStudents = studentsSnap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Unnamed Student",
          email: doc.data().email || "N/A",
          role: "Student",
          status: doc.data().status || "Active",
          joinDate: doc.data().createdAt
            ? new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString()
            : "Unknown",
        }));

        const fetchedOwners = ownersSnap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Unnamed Owner",
          email: doc.data().email || "N/A",
          role: "Owner",
          status: doc.data().status || "Active",
          joinDate: doc.data().createdAt
            ? new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString()
            : "Unknown",
        }));

        setUsers([...fetchedStudents, ...fetchedOwners]);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string, role: string) => {
    try {
      const collectionName = role === "Student" ? "students" : "users";
      await deleteDoc(doc(db, collectionName, userId));
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleSuspend = async (userId: string, role: string) => {
    try {
      const collectionName = role === "Student" ? "students" : "users";
      await updateDoc(doc(db, collectionName, userId), { status: "Suspended" });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: "Suspended" } : u
        )
      );
    } catch (err) {
      console.error("Error suspending user:", err);
    }
  };

  const handleActivate = async (userId: string, role: string) => {
    try {
      const collectionName = role === "Student" ? "students" : "users";
      await updateDoc(doc(db, collectionName, userId), { status: "Active" });
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: "Active" } : u
        )
      );
    } catch (err) {
      console.error("Error activating user:", err);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <AdminLayout activePage="admin-users" navigateTo={navigateTo} logout={logout}>
        <div className="flex justify-center items-center h-screen text-gray-500">
          Loading users...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="admin-users" navigateTo={navigateTo} logout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">User Management</h1>
          <p className="text-gray-600">Manage students and hostel owners</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-3xl mt-1">
                    {users.filter((u) => u.role === "Student").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">👨‍🎓</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Owners</p>
                  <p className="text-3xl mt-1">
                    {users.filter((u) => u.role === "Owner").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏢</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-3xl mt-1">
                    {users.filter((u) => u.status === "Active").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <span className="text-xl">✓</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <CardTitle>All Users</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Owner">Owner</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell className="text-gray-600">{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role === "Student" ? "default" : "secondary"}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "Active" ? "default" : "destructive"
                          }
                          className={
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : ""
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600">{user.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            {user.status === "Active" ? (
                              <DropdownMenuItem
                                onClick={() => handleSuspend(user.id, user.role)}
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleActivate(user.id, user.role)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(user.id, user.role)}
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

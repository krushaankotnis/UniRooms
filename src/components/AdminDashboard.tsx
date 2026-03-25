import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AdminLayout } from './AdminLayout';
import { Page } from '../App';
import {
  Users,
  Building2,
  Calendar,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface AdminDashboardProps {
  navigateTo: (page: Page) => void;
  logout: () => void;
}

export function AdminDashboard({ navigateTo, logout }: AdminDashboardProps) {
  const [stats, setStats] = useState({
    students: 0,
    owners: 0,
    hostels: 0,
    bookings: 0,
  });

  const [hostelStatusData, setHostelStatusData] = useState([
    { name: 'Approved', value: 0, color: '#3b82f6' },
    { name: 'Pending', value: 0, color: '#f59e0b' },
    { name: 'Rejected', value: 0, color: '#ef4444' },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students count
        const studentsSnap = await getDocs(collection(db, 'students'));

        // Fetch owners count
        const ownersSnap = await getDocs(collection(db, 'users'));

        // Fetch hostels collection
        const hostelsSnap = await getDocs(collection(db, 'hostels'));

        // Count hostel statuses
        let approved = 0, pending = 0, rejected = 0;
        hostelsSnap.forEach((doc) => {
          const status = doc.data().status;
          if (status === 'Approved') approved++;
          else if (status === 'Pending') pending++;
          else if (status === 'Rejected') rejected++;
        });

        // Fetch bookings (optional — if exists)
        let bookingsSnap;
        try {
          bookingsSnap = await getDocs(collection(db, 'bookings'));
        } catch {
          bookingsSnap = { size: 0 };
        }

        // Update state
        setStats({
          students: studentsSnap.size,
          owners: ownersSnap.size,
          hostels: hostelsSnap.size,
          bookings: bookingsSnap.size,
        });

        setHostelStatusData([
          { name: 'Approved', value: approved, color: '#3b82f6' },
          { name: 'Pending', value: pending, color: '#f59e0b' },
          { name: 'Rejected', value: rejected, color: '#ef4444' },
        ]);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock chart data (you can later replace with analytics)
  const userGrowthData = [
    { month: 'Jan', students: 120, owners: 25 },
    { month: 'Feb', students: 180, owners: 32 },
    { month: 'Mar', students: 240, owners: 45 },
    { month: 'Apr', students: 310, owners: 58 },
    { month: 'May', students: 390, owners: 72 },
    { month: 'Jun', students: 480, owners: 85 },
  ];

  const bookingData = [
    { month: 'Jan', bookings: 45 },
    { month: 'Feb', bookings: 62 },
    { month: 'Mar', bookings: 78 },
    { month: 'Apr', bookings: 95 },
    { month: 'May', bookings: 110 },
    { month: 'Jun', bookings: 135 },
  ];

  const recentActivities = [
    { id: 1, type: 'New Hostel', description: 'Sunshine Hostel registered', time: '2 hours ago', icon: Building2, color: 'text-blue-600 bg-blue-50' },
    { id: 2, type: 'New Booking', description: 'Student booked Green Valley Hostel', time: '3 hours ago', icon: Calendar, color: 'text-green-600 bg-green-50' },
    { id: 3, type: 'New User', description: 'John Smith joined as student', time: '5 hours ago', icon: Users, color: 'text-purple-600 bg-purple-50' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading live dashboard data...
      </div>
    );
  }

  const statsCards = [
    {
      title: 'Total Students',
      value: stats.students.toString(),
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Total Hostel Owners',
      value: stats.owners.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Total Hostels',
      value: stats.hostels.toString(),
      change: '+15.3%',
      trend: 'up',
      icon: Building2,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Total Bookings',
      value: stats.bookings.toString(),
      change: '+22.7%',
      trend: 'up',
      icon: Calendar,
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <AdminLayout activePage="admin-dashboard" navigateTo={navigateTo} logout={logout}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here’s what’s happening with UniRooms today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl mb-2">{stat.value}</p>
                      <div className="flex items-center gap-1">
                        {stat.trend === 'up' ? (
                          <ArrowUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500">vs last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <p className="text-sm text-gray-600">Monthly user registration trends</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} name="Students" />
                  <Line type="monotone" dataKey="owners" stroke="#8b5cf6" strokeWidth={2} name="Owners" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
              <p className="text-sm text-gray-600">Monthly booking statistics</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Hostel Status + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hostel Status</CardTitle>
              <p className="text-sm text-gray-600">Current approval status</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={hostelStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                    {hostelStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {hostelStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.type}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

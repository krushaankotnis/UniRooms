import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AdminLayout } from './AdminLayout';
import { Page } from '../App';
import { Users, Building2, Calendar } from 'lucide-react';
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface AdminDashboardProps {
  navigateTo: (page: Page) => void;
  logout: () => void;
}

export function AdminDashboard({ navigateTo, logout }: AdminDashboardProps) {

  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingDocs, setBookingDocs] = useState<any[]>([]);

  const [stats, setStats] = useState({
    students: 0,
    owners: 0,
    hostels: 0,
    bookings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsSnap = await getDocs(collection(db, 'students'));
        const ownersSnap = await getDocs(collection(db, 'users'));
        const hostelsSnap = await getDocs(collection(db, 'hostels'));
        const serviceBookingsSnap = await getDocs(collection(db, 'serviceBookings'));

        setBookings(serviceBookingsSnap.docs.map(d => d.data()));
        setBookingDocs(serviceBookingsSnap.docs.map(d => d.id));

        setStats({
          students: studentsSnap.size,
          owners: ownersSnap.size,
          hostels: hostelsSnap.size,
          bookings: serviceBookingsSnap.size,
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markDone = async (id: string) => {
    await updateDoc(doc(db, "serviceBookings", id), {
      status: "Completed"
    });
    window.location.reload();
  };

  const removeBooking = async (id: string) => {
    await deleteDoc(doc(db, "serviceBookings", id));
    window.location.reload();
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <AdminLayout activePage="admin-dashboard" navigateTo={navigateTo} logout={logout}>
      <div className="space-y-6">

        {/* 🔥 IMPROVED STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Card className="shadow-md rounded-xl">
            <CardContent className="p-5 flex justify-between">
              <div>
                <p className="text-gray-500">Students</p>
                <h2 className="text-2xl font-bold">{stats.students}</h2>
              </div>
              <Users className="text-blue-600" />
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardContent className="p-5 flex justify-between">
              <div>
                <p className="text-gray-500">Owners</p>
                <h2 className="text-2xl font-bold">{stats.owners}</h2>
              </div>
              <Users className="text-purple-600" />
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardContent className="p-5 flex justify-between">
              <div>
                <p className="text-gray-500">Hostels</p>
                <h2 className="text-2xl font-bold">{stats.hostels}</h2>
              </div>
              <Building2 className="text-green-600" />
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-xl">
            <CardContent className="p-5 flex justify-between">
              <div>
                <p className="text-gray-500">Bookings</p>
                <h2 className="text-2xl font-bold">{stats.bookings}</h2>
              </div>
              <Calendar className="text-orange-600" />
            </CardContent>
          </Card>

        </div>

        {/* 🔥 SERVICE BOOKINGS */}
        <Card>
          <CardHeader>
            <CardTitle>Service Bookings</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">

              {bookings.length === 0 ? (
                <p>No bookings</p>
              ) : (
                bookings.map((b, i) => (
                  <div key={i} className="border p-4 rounded-xl shadow-sm">

                    <div className="flex justify-between">
                      <h3 className="font-semibold">{b.service}</h3>

                      <span className={`text-xs px-2 py-1 rounded ${
                        b.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}>
                        {b.status || "Pending"}
                      </span>
                    </div>

                    <p>Name: {b.name}</p>
                    <p>Room: {b.room}</p>
                    <p>Plan: {b.price}</p>
                    <p className="mb-2">Payment: {b.payment}</p>

                    <div className="flex gap-2">

                      {b.status !== "Completed" && (
                        <button
                          onClick={() => markDone(bookingDocs[i])}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Mark Done
                        </button>
                      )}

                      {b.status === "Completed" && (
                        <button
                          onClick={() => removeBooking(bookingDocs[i])}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Remove
                        </button>
                      )}

                    </div>

                  </div>
                ))
              )}

            </div>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
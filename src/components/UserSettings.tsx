import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Page } from "../App";
import { LogOut, Calendar, Star, CheckCircle } from "lucide-react";

// 🔥 FIREBASE
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

interface Props {
  navigateTo: (page: Page) => void;
  logout: () => void;
}

export function UserSettings({ navigateTo, logout }: Props) {

  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [serviceBookings, setServiceBookings] = useState<any[]>([]); // ✅ ADDED
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firebaseUser = auth.currentUser;

        if (!firebaseUser?.email) return;

        // 🔥 FETCH USER
        const userSnap = await getDocs(collection(db, "students"));
        const users = userSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const foundUser = users.find(
          (u: any) =>
            u.email?.toLowerCase() === firebaseUser.email?.toLowerCase()
        );

        if (foundUser) {
          setUser(foundUser);
        }

        // 🔥 FETCH HOSTEL BOOKINGS
        const bookingSnap = await getDocs(collection(db, "bookings"));

        const userBookings = bookingSnap.docs
          .map(doc => doc.data())
          .filter((b: any) =>
            b.studentEmail?.toLowerCase() === firebaseUser.email?.toLowerCase()
          );

        setBookings(userBookings);
        setTotalBookings(userBookings.length);

        // 🔥 FETCH SERVICE BOOKINGS (ADDED)
        const serviceSnap = await getDocs(collection(db, "serviceBookings"));

        const userServices = serviceSnap.docs
          .map(doc => doc.data())
          .filter((s: any) =>
            s.name?.toLowerCase() === foundUser?.name?.toLowerCase()
          );

        setServiceBookings(userServices);

      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n: string) => n[0])
      .join("");
  };

  const memberSince = new Date().toLocaleDateString();
  const servicesUsed = serviceBookings.length; // ✅ BETTER COUNT
  const lastActivity = "Recently";

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">

      <div className="max-w-md mx-auto space-y-4">

        {/* PROFILE */}
        <Card className="shadow-lg rounded-xl">

          <CardHeader className="text-center">

            <div className="flex justify-center mb-3">
              <div className="bg-blue-600 text-white w-16 h-16 flex items-center justify-center rounded-full text-xl font-bold">
                {getInitials()}
              </div>
            </div>

            <CardTitle className="text-xl">
              {user?.name || "Student"}
            </CardTitle>

            <p className="text-sm text-gray-500">
              {user?.email || "Loading..."}
            </p>

            <div className="flex justify-center mt-2">
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Active User
              </span>
            </div>

          </CardHeader>

          <CardContent className="space-y-5">

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 text-center">

              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Bookings</p>
                <p className="text-lg font-semibold">{totalBookings}</p>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Services Used</p>
                <p className="text-lg font-semibold">{servicesUsed}</p>
              </div>

            </div>

            {/* DETAILS */}
            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member Since
                </span>
                <span>{memberSince}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Last Activity
                </span>
                <span>{lastActivity}</span>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="space-y-3 pt-2">

              <Button
                onClick={() => navigateTo("search-browse")}
                className="w-full"
              >
                Back to Browse
              </Button>

              <Button
                onClick={logout}
                className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>

            </div>

          </CardContent>

        </Card>

        {/* 🔥 HOSTEL BOOKINGS */}
        <Card>
          <CardHeader>
            <CardTitle>Booking History</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            {bookings.length === 0 ? (
              <p className="text-gray-500 text-sm">No bookings yet</p>
            ) : (
              bookings.map((b, i) => (
                <div key={i} className="border p-3 rounded-lg bg-gray-50">
                  <p className="font-medium">{b.hostelName}</p>

                  <p className="text-sm text-gray-600">
                    Room: {b.roomType}
                  </p>

                  <p className="text-sm text-gray-600">
                    Duration: {b.duration}
                  </p>

                  <p className="text-xs text-gray-400">
                    Check-in: {new Date(b.checkInDate).toLocaleDateString()}
                  </p>

                  <p className="text-xs text-gray-400">
                    ₹{b.pricing?.total}
                  </p>

                  <p className="text-xs text-gray-500">
                    Payment: {b.paymentMethod} • {b.paymentStatus || "pending"}
                  </p>

                  <span className={`text-xs font-medium ${
                    b.status === "confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}>
                    {b.status}
                  </span>
                </div>
              ))
            )}

          </CardContent>
        </Card>

        {/* 🔥 SERVICE BOOKINGS (NEW) */}
        <Card>
          <CardHeader>
            <CardTitle>Service Bookings</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">

            {serviceBookings.length === 0 ? (
              <p className="text-gray-500 text-sm">No service bookings</p>
            ) : (
              serviceBookings.map((s, i) => (
                <div key={i} className="border p-3 rounded-lg bg-gray-50">
                  <p className="font-medium">{s.service}</p>

                  <p className="text-sm text-gray-600">
                    Room: {s.room}
                  </p>

                  <p className="text-sm text-gray-600">
                    Plan: {s.price}
                  </p>

                  <p className="text-xs text-gray-500">
                    Payment: {s.payment} • {s.paymentStatus || "pending"}
                  </p>

                  <span className={`text-xs font-medium ${
                    s.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}>
                    {s.status || "Pending"}
                  </span>
                </div>
              ))
            )}

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
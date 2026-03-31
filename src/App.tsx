import "./firebase";

import React, { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { StudentRegistration } from "./components/StudentRegistration";
import { StudentLogin } from "./components/StudentLogin";
import { OwnerRegistration } from "./components/OwnerRegistration";
import { OwnerLogin } from "./components/OwnerLogin";
import { SearchBrowse } from "./components/SearchBrowse";
import { HostelDetails } from "./components/HostelDetails";
import { BookingPage } from "./components/BookingPage";
import { ReviewsPage } from "./components/ReviewsPage";
import { OwnerDashboard } from "./components/OwnerDashboard";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { Header } from "./components/Header";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminUserManagement } from "./components/AdminUserManagement";
import { AdminHostelManagement } from "./components/AdminHostelManagement";
import { AdminBookingManagement } from "./components/AdminBookingManagement";
import { AdminReviews } from "./components/AdminReviews";
import { AdminSettings } from "./components/AdminSettings";
import { Chatbot } from "./components/Chatbot";
import { Services } from "./components/Services";

// ✅ Default import (correct)
import PaymentQRPage from "./components/PaymentQRPage";

// Firebase
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export type UserType = "student" | "owner" | "admin" | null;

export type Page =
  | "landing"
  | "student-register"
  | "student-login"
  | "owner-register"
  | "owner-login"
  | "search-browse"
  | "hostel-details"
  | "booking"
  | "payment-qr"
  | "reviews"
  | "owner-dashboard"
  | "about"
  | "contact"
  | "services"
  | "admin-login"
  | "admin-dashboard"
  | "admin-users"
  | "admin-hostels"
  | "admin-bookings"
  | "admin-reviews"
  | "admin-settings";

export interface Hostel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  distance: string;
  image: string;
  amenities: string[];
  reviews: Review[];
  description: string;
  images: string[];
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(() => {
    const saved = localStorage.getItem("selectedHostel");
    return saved ? JSON.parse(saved) : null;
  });

  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // ✅ Auth Listener (unchanged logic)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const role = userDoc.data().role as UserType;
            setUserType(role);
            setIsLoggedIn(true);

            if (role === "student") setCurrentPage("search-browse");
            else if (role === "owner") setCurrentPage("owner-dashboard");

            setCheckingAuth(false);
            return;
          }

          // 🔥 Admin check
          const adminRef = doc(db, "admins", user.uid);
          const adminDoc = await getDoc(adminRef);

          if (adminDoc.exists() && adminDoc.data().role === "admin") {
            setUserType("admin");
            setIsLoggedIn(true);
            setCurrentPage("admin-dashboard");
          }
        } else {
          setUserType(null);
          setIsLoggedIn(false);
          setCurrentPage("landing");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const navigateTo = (page: Page) => setCurrentPage(page);
  const selectUserType = (type: UserType) => setUserType(type);

  const login = () => {
    setIsLoggedIn(true);
    if (userType === "student") navigateTo("search-browse");
    else if (userType === "owner") navigateTo("owner-dashboard");
    else if (userType === "admin") navigateTo("admin-dashboard");
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
    localStorage.removeItem("selectedHostel");
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentBookingId(null);
    navigateTo("landing");
  };

  const selectHostel = (hostel: Hostel) => {
    setSelectedHostel(hostel);
    localStorage.setItem("selectedHostel", JSON.stringify(hostel));
    navigateTo("hostel-details");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return (
          <LandingPage
            navigateTo={navigateTo}
            selectUserType={selectUserType}
            selectHostel={selectHostel}
          />
        );

      case "student-register":
        return <StudentRegistration navigateTo={navigateTo} />;

      case "student-login":
        return (
          <StudentLogin
            navigateTo={navigateTo}
            login={() => {
              setUserType("student");
              login();
            }}
          />
        );

      case "owner-register":
        return <OwnerRegistration navigateTo={navigateTo} />;

      case "owner-login":
        return (
          <OwnerLogin
            navigateTo={navigateTo}
            login={() => {
              setUserType("owner");
              login();
            }}
          />
        );

      case "search-browse":
        return (
          <SearchBrowse navigateTo={navigateTo} selectHostel={selectHostel} />
        );

      case "hostel-details":
        return (
          <HostelDetails navigateTo={navigateTo} hostel={selectedHostel} />
        );

      case "booking":
        return (
          <BookingPage
            navigateTo={navigateTo}
            hostel={selectedHostel}
            setCurrentBookingId={setCurrentBookingId}
          />
        );

      case "payment-qr":
        return (
          <PaymentQRPage
            navigateTo={navigateTo}
            bookingId={currentBookingId}
          />
        );

      case "reviews":
        return <ReviewsPage navigateTo={navigateTo} hostel={selectedHostel} />;

      case "owner-dashboard":
        return <OwnerDashboard navigateTo={navigateTo} />;

      case "about":
        return <AboutPage navigateTo={navigateTo} />;

      case "contact":
        return <ContactPage navigateTo={navigateTo} />;

        case "services":
  return <Services />;

      // ✅ FIXED: Removed login() from AdminLogin
      case "admin-login":
        return (
          <AdminLogin
            navigateTo={navigateTo}
          />
        );

      case "admin-dashboard":
        return <AdminDashboard navigateTo={navigateTo} logout={logout} />;

      case "admin-users":
        return <AdminUserManagement navigateTo={navigateTo} logout={logout} />;

      case "admin-hostels":
        return <AdminHostelManagement navigateTo={navigateTo} logout={logout} />;

      case "admin-bookings":
        return <AdminBookingManagement navigateTo={navigateTo} logout={logout} />;

      case "admin-reviews":
        return <AdminReviews navigateTo={navigateTo} logout={logout} />;

      case "admin-settings":
        return <AdminSettings navigateTo={navigateTo} logout={logout} />;

      default:
        return (
          <LandingPage
            navigateTo={navigateTo}
            selectUserType={selectUserType}
            selectHostel={selectHostel}
          />
        );
    }
  };

  const adminPages: Page[] = [
    "admin-dashboard",
    "admin-users",
    "admin-hostels",
    "admin-bookings",
    "admin-reviews",
    "admin-settings",
  ];

  const isAdminPage = adminPages.includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        navigateTo={navigateTo}
        userType={userType}
        isLoggedIn={isLoggedIn}
        logout={logout}
        currentPage={currentPage}
      />
      <main className={isAdminPage ? "" : "pt-16"}>
        {renderPage()}
      </main>
      <Chatbot />
    </div>
  );
}

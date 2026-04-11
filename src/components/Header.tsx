import React from 'react';
import { Button } from './ui/button';
import { Home, User, LogOut, Building2 } from 'lucide-react';
import { Page, UserType } from '../App';

interface HeaderProps {
  navigateTo: (page: Page) => void;
  userType: UserType;
  isLoggedIn: boolean;
  logout: () => void;
  currentPage: Page;
}

export function Header({ navigateTo, userType, isLoggedIn, logout, currentPage }: HeaderProps) {
  // Don't show header on admin pages (except login)
  const adminPages: Page[] = ['admin-dashboard', 'admin-users', 'admin-hostels', 'admin-bookings', 'admin-reviews', 'admin-settings'];
  if (adminPages.includes(currentPage)) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigateTo('landing')}
          >
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">UniRooms</span>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigateTo('landing')}
              className={`text-sm hover:text-blue-600 transition-colors ${
                currentPage === 'landing' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`text-sm hover:text-blue-600 transition-colors ${
                currentPage === 'about' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              About
            </button>

            <button
              onClick={() => navigateTo("services")}
              className={`text-sm hover:text-blue-600 transition-colors ${
                currentPage === 'services' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Services
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`text-sm hover:text-blue-600 transition-colors ${
                currentPage === 'contact' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Contact
            </button>

            <button
              onClick={() => navigateTo('admin-login')}
              className={`text-sm hover:text-blue-600 transition-colors ${
                currentPage === 'admin-login' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Admin
            </button>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-4">

            {!isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigateTo(userType === 'owner' ? 'owner-login' : 'student-login')}
                >
                  Sign In
                </Button>

                <Button 
                  size="sm"
                  onClick={() => navigateTo(userType === 'owner' ? 'owner-register' : 'student-register')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">

                {/* STUDENT BUTTONS */}
                {userType === 'student' && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateTo('search-browse')}
                      className="flex items-center space-x-1"
                    >
                      <Home className="h-4 w-4" />
                      <span>Browse</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateTo('user-settings')}
                      className="flex items-center space-x-1"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Button>
                  </>
                )}

                {/* OWNER BUTTON */}
                {userType === 'owner' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateTo('owner-dashboard')}
                    className="flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                )}

                {/* LOGOUT */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>

              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Users, Shield } from 'lucide-react';
import { Page, UserType, Hostel } from '../App';

interface LandingPageProps {
  navigateTo: (page: Page) => void;
  selectUserType: (type: UserType) => void;
  selectHostel: (hostel: Hostel) => void;
}

export function LandingPage({ navigateTo, selectUserType }: LandingPageProps) {

  const [showChoiceScreen, setShowChoiceScreen] = useState(true);

  const handleUserTypeSelection = (type: UserType) => {
    selectUserType(type);
    setShowChoiceScreen(false);

    if (type === "student") navigateTo("search-browse");
    if (type === "owner") navigateTo("owner-login");
  };

  const handleBrowse = () => {
    setShowChoiceScreen(false);
    navigateTo("search-browse");
  };

  // ✅ RESTORED ORIGINAL UI
  if (showChoiceScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">

        <div className="max-w-md w-full space-y-8 text-center">

          <div>
            <h1 className="text-3xl mb-4 text-gray-900">Welcome to UniRooms</h1>
            <p className="text-lg text-gray-600 mb-8">
              Choose your role to get started
            </p>
          </div>

          <div className="space-y-4">

            <Button
              className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700"
              onClick={() => handleUserTypeSelection('student')}
            >
              <Users className="mr-3 h-6 w-6" />
              I am a Student
            </Button>

            <Button
              variant="outline"
              className="w-full h-16 text-lg border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => handleUserTypeSelection('owner')}
            >
              <Shield className="mr-3 h-6 w-6" />
              I am a Hostel Owner
            </Button>

          </div>

          <div className="pt-4">
            <Button
              variant="ghost"
              onClick={handleBrowse}
              className="text-blue-600 hover:text-blue-700"
            >
              Just browse for now →
            </Button>
          </div>

        </div>

      </div>
    );
  }

  return null;
}
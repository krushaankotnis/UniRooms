import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Mail, User, Lock, MapPin, Building2, Phone, Upload } from 'lucide-react';
import { Page } from '../App';

// ✅ Firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

interface OwnerRegistrationProps {
  navigateTo: (page: Page) => void;
}

export function OwnerRegistration({ navigateTo }: OwnerRegistrationProps) {
  const [formData, setFormData] = useState({
    hostelName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    description: '',
    amenities: [] as string[]
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const amenitiesList = [
    'WiFi', 'AC', 'Parking', 'Security', 'Laundry', 'Kitchen',
    'Study Room', 'Gym', 'Cafeteria', 'Common Room'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🛠 Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setError('');

      // ✅ Create Owner Account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // ✅ Save Owner Details in Firestore (with role)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        role: "owner",
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
      });

      // ✅ Save Hostel Details in "hostels" Collection with default values
      await addDoc(collection(db, "hostels"), {
        hostelName: formData.hostelName,
        ownerId: user.uid,
        ownerName: formData.ownerName,
        location: formData.location,
        description: formData.description,
        amenities: formData.amenities,
        email: formData.email,
        phone: formData.phone,
        price: 8000, // ✅ default price (prevents blank pages)
        image: "https://images.unsplash.com/photo-1609587639086-b4cbf85e4355", // ✅ default image
        rating: 4.5, // ✅ default rating
        createdAt: new Date().toISOString(),
      });

      alert("✅ Hostel registered successfully!");
      navigateTo('owner-login');

    } catch (err: any) {
      console.error("Firebase error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigateTo('landing')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Register Your Hostel</CardTitle>
            <p className="text-gray-600 mt-2">
              Join UniRooms as a hostel owner and connect with students
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hostelName">Hostel Name</Label>
                  <div className="relative mt-1">
                    <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="hostelName"
                      name="hostelName"
                      type="text"
                      required
                      placeholder="Enter hostel name"
                      value={formData.hostelName}
                      onChange={handleInputChange}
                      className="pl-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="ownerName"
                      name="ownerName"
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      className="pl-11"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-11"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Hostel Location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="Enter complete address"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="pl-11"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Hostel Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Describe your hostel, facilities, and what makes it special"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label>Amenities Available</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onCheckedChange={(checked) =>
                          handleAmenityChange(amenity, checked as boolean)
                        }
                      />
                      <Label htmlFor={amenity} className="text-sm">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Upload Hostel Images</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drag and drop images here, or click to select files
                  </p>
                  <Button type="button" variant="outline" className="mt-2">
                    Choose Images
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-11"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-11"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms of Service and Privacy Policy
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Hostel"}
              </Button>

              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <button
                onClick={() => navigateTo('owner-login')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

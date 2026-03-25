import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Users, 
  Shield, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle, 
  Target, 
  Heart,
  Building2,
  Search,
  MessageSquare
} from 'lucide-react';
import { Page } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  navigateTo: (page: Page) => void;
}

export function AboutPage({ navigateTo }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl mb-6">About UniRooms</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Connecting students with comfortable, affordable, and verified hostel accommodations across India
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At UniRooms, we believe every student deserves a safe, comfortable, and affordable place to call home 
                during their academic journey. We're dedicated to bridging the gap between students seeking quality 
                accommodation and hostel owners offering exceptional living spaces.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our platform simplifies the search process, ensuring transparency, reliability, and peace of mind 
                for both students and hostel owners.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600">Trusted Platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-red-500">Student-Focused</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1571474039046-42bc4e7f4b98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwYWNjb21tb2RhdGlvbiUyMHJvb218ZW58MXx8fHwxNzU4MDE0OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Student accommodation"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Why Choose UniRooms?</h2>
            <p className="text-lg text-gray-600">
              We provide comprehensive solutions for all your hostel accommodation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl mb-4">Easy Search</h3>
                <p className="text-gray-600">
                  Advanced filters help you find the perfect hostel near your college with desired amenities and budget.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl mb-4">Verified Listings</h3>
                <p className="text-gray-600">
                  All hostels are thoroughly verified for safety, cleanliness, and authenticity before listing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl mb-4">Real Reviews</h3>
                <p className="text-gray-600">
                  Genuine reviews from actual students help you make informed decisions about your accommodation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock customer support to assist you with bookings, queries, and any issues.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl mb-4">Prime Locations</h3>
                <p className="text-gray-600">
                  Hostels strategically located near colleges, universities, and educational institutions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Building2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl mb-4">Quality Standards</h3>
                <p className="text-gray-600">
                  Strict quality standards ensure all listed properties meet safety and comfort requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">How UniRooms Works</h2>
            <p className="text-lg text-gray-600">
              Simple steps to find your perfect accommodation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Students */}
            <div>
              <h3 className="text-2xl mb-6 text-center">For Students</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Search & Filter</h4>
                    <p className="text-gray-600">
                      Use our advanced search to find hostels near your college with your preferred amenities and budget.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Compare & Review</h4>
                    <p className="text-gray-600">
                      Compare different options, read genuine reviews, and view detailed photos and amenities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Book Securely</h4>
                    <p className="text-gray-600">
                      Complete your booking with secure payment options and get instant confirmation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Move In</h4>
                    <p className="text-gray-600">
                      Move into your new home with confidence and enjoy your academic journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Owners */}
            <div>
              <h3 className="text-2xl mb-6 text-center">For Hostel Owners</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Register & Verify</h4>
                    <p className="text-gray-600">
                      Create your profile, provide hostel details, and complete our verification process.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Create Listing</h4>
                    <p className="text-gray-600">
                      Upload photos, set pricing, describe amenities, and showcase what makes your hostel special.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Manage Bookings</h4>
                    <p className="text-gray-600">
                      Receive booking requests, manage occupancy, and communicate with students through our platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Grow Your Business</h4>
                    <p className="text-gray-600">
                      Build your reputation through reviews and grow your hostel business with our marketing support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">500+</div>
              <div className="text-blue-100">Verified Hostels</div>
            </div>
            <div>
              <div className="text-4xl mb-2">10,000+</div>
              <div className="text-blue-100">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl mb-2">50+</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl mb-2">4.8★</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl mb-4">Trust & Safety</h3>
                <p className="text-gray-600">
                  We prioritize the safety and security of all our users through rigorous verification processes and quality standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl mb-4">Transparency</h3>
                <p className="text-gray-600">
                  We believe in complete transparency in pricing, policies, and processes to build trust with our community.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl mb-4">Community</h3>
                <p className="text-gray-600">
                  We foster a supportive community where students and hostel owners can thrive together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Ready to Find Your Perfect Hostel?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students who have found their ideal accommodation through UniRooms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigateTo('search-browse')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Browse Hostels
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigateTo('contact')}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
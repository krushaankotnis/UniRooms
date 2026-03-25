import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  HelpCircle,
  Building2,
  Users
} from 'lucide-react';
import { Page } from '../App';

interface ContactPageProps {
  navigateTo: (page: Page) => void;
}

export function ContactPage({ navigateTo }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions? We're here to help! Reach out to us anytime.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">General Inquiries</p>
                <p className="font-medium mb-4">support@unirooms.com</p>
                <p className="text-gray-600 mb-2">Business Partnerships</p>
                <p className="font-medium">partnerships@unirooms.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-600" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Customer Support</p>
                <p className="font-medium mb-4">+91 98765 43210</p>
                <p className="text-gray-600 mb-2">Business Inquiries</p>
                <p className="font-medium">+91 87654 32109</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-600" />
                  Visit Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Head Office</p>
                <p className="font-medium mb-2">
                  UniRooms Technologies Pvt Ltd<br />
                  123 Business Plaza, 2nd Floor<br />
                  Sector 18, Gurgaon<br />
                  Haryana 122015, India
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-600" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <p className="text-sm text-blue-600 mt-3">
                  *Customer support available 24/7 online
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label>Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student Inquiry</SelectItem>
                          <SelectItem value="owner">Hostel Owner</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="business">Business Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Please provide detailed information about your inquiry..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    For Students
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-sm mb-1">How do I book a hostel?</h5>
                      <p className="text-sm text-gray-600">
                        Simply search for hostels in your preferred location, compare options, and click "Book Now" on your chosen hostel.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">Is there a booking fee?</h5>
                      <p className="text-sm text-gray-600">
                        We charge a small processing fee of ₹500 per booking to cover transaction costs.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">Can I cancel my booking?</h5>
                      <p className="text-sm text-gray-600">
                        Yes, you can cancel within 24 hours of booking for a full refund. Check our cancellation policy for details.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-green-600" />
                    For Hostel Owners
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-sm mb-1">How do I list my hostel?</h5>
                      <p className="text-sm text-gray-600">
                        Register as a hostel owner, complete the verification process, and create your hostel listing with photos and details.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">What are the commission charges?</h5>
                      <p className="text-sm text-gray-600">
                        We charge a 5% commission on successful bookings. No upfront fees or hidden charges.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">How do I receive payments?</h5>
                      <p className="text-sm text-gray-600">
                        Payments are processed securely and transferred to your bank account within 2-3 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Still have questions? Don't hesitate to reach out!
                </p>
                <Button 
                  variant="outline"
                  onClick={() => navigateTo('about')}
                >
                  Learn More About UniRooms
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
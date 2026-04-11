import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ArrowLeft, Calendar as CalendarIcon, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { format } from 'date-fns';
import { Page, Hostel } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import emailjs from "emailjs-com";

// Firebase
import { db, auth } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface BookingPageProps {
  navigateTo: (page: Page) => void;
  hostel: Hostel | null;
  setCurrentBookingId: (id: string) => void; // ✅ NEW
}

export function BookingPage({ navigateTo, hostel, setCurrentBookingId }: BookingPageProps) {
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [roomType, setRoomType] = useState('');
  const [duration, setDuration] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Please select a hostel first</h2>
          <Button onClick={() => navigateTo('search-browse')}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    let months = 1;
    if (duration === '3months') months = 3;
    else if (duration === '6months') months = 6;
    else if (duration === '12months') months = 12;

    const basePrice = hostel.price * months;
    const securityDeposit = hostel.price;
    const processingFee = 500;

    return {
      basePrice,
      securityDeposit,
      processingFee,
      total: basePrice + securityDeposit + processingFee
    };
  };

  const pricing = calculateTotal();

  const sendEmail = (data: any) => {
  emailjs.send(
    "service_fjtwmzo",
    "template_086t8p7",
    {
      name: data.studentName,
      email: data.studentEmail,
      hostel: data.hostelName,
      room: data.roomType,
      date: new Date(data.checkInDate).toLocaleDateString(),
      duration: data.duration,
      amount: data.pricing.total,
      payment: data.paymentMethod,
      status: data.status
    },
    "sL_iRwBG50q-fXsg_"
  )
  .then(() => {
    console.log("✅ Email sent");
  })
  .catch((err) => {
    console.error("❌ Email error:", err);
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkInDate || !roomType || !duration || !paymentMethod) {
      alert('Please fill all required booking fields.');
      return;
    }

    try {
      setLoading(true);

      const student = auth.currentUser;
      const pricingData = calculateTotal();

      const bookingData = {
        hostelId: hostel.id || null,
        hostelName: hostel.name || 'Unnamed Hostel',
        studentId: student?.uid || null,
        studentName: formData.name,
        studentEmail: formData.email,
        studentPhone: formData.phone,
        emergencyContact: formData.emergencyContact,
        specialRequests: formData.specialRequests,
        checkInDate: checkInDate.toISOString(),
        duration,
        roomType,
        paymentMethod,
        pricing: pricingData,
        status: paymentMethod === 'googlepay' ? 'pending-payment' : 'confirmed',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'bookings'), bookingData);

      sendEmail(bookingData);
      console.log('Booking saved with ID:', docRef.id);

      // ✅ If Google Pay → Go to QR Page
      if (paymentMethod === 'googlepay') {
        setCurrentBookingId(docRef.id);
        navigateTo('payment-qr');
      } else {
        alert('✅ Booking Confirmed!');
        navigateTo('search-browse');
      }

    } catch (err) {
      console.error('Error saving booking:', err);
      alert('❌ Failed to save booking. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigateTo('hostel-details')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hostel Details
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Booking</CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Personal Info */}
                  <div>
                    <h3 className="mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input required name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange}/>
                      <Input required name="email" type="email" placeholder="Email" value={formData.email} onChange={handleInputChange}/>
                      <Input required name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleInputChange}/>
                      <Input name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleInputChange}/>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h3 className="mb-4">Booking Details</h3>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ? format(checkInDate, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate}/>
                      </PopoverContent>
                    </Popover>

                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Room Type"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="shared">Shared</SelectItem>
                        <SelectItem value="dormitory">Dormitory</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1month">1 Month</SelectItem>
                        <SelectItem value="3months">3 Months</SelectItem>
                        <SelectItem value="6months">6 Months</SelectItem>
                        <SelectItem value="12months">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment */}
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <RadioGroupItem value="googlepay" id="googlepay" />
                    <Label htmlFor="googlepay">Google Pay</Label>

                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Card</Label>
                  </RadioGroup>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : `Confirm Booking - ₹${pricing.total}`}
                  </Button>

                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card>
              <CardContent>
                <ImageWithFallback src={hostel.image} alt={hostel.name}/>
                <h4>{hostel.name}</h4>
                <p>{hostel.location}</p>
                <p>Total: ₹{pricing.total}</p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}

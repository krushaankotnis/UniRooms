import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Page } from "../App";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

interface PaymentQRPageProps {
  navigateTo: (page: Page) => void;
  bookingId: string | null;
}

export default function PaymentQRPage({
  navigateTo,
  bookingId,
}: PaymentQRPageProps) {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

  useEffect(() => {
    if (!bookingId) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [bookingId]);

  useEffect(() => {
    if (timeLeft <= 0 && bookingId) {
      updateDoc(doc(db, "bookings", bookingId), {
        status: "expired",
      });
      alert("Payment time expired!");
      navigateTo("search-browse");
    }
  }, [timeLeft, bookingId, navigateTo]);

  const handlePaymentSuccess = async () => {
    if (!bookingId) return;

    await updateDoc(doc(db, "bookings", bookingId), {
      status: "confirmed",
    });

    alert("Payment Successful!");
    navigateTo("search-browse");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-96 text-center">
        <CardHeader>
          <CardTitle>Scan & Pay (Google Pay)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* QR Code */}
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=test@upi"
            alt="QR Code"
            className="mx-auto"
          />

          <p className="text-red-600 font-semibold">
            Time Remaining: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </p>

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={handlePaymentSuccess}
          >
            I Have Paid
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigateTo("search-browse")}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

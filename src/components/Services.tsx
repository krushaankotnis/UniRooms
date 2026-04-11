import React, { useState } from "react";
import tiffin from "../assets/tiffin.jpg";
import laundry from "../assets/laundry.jpg";
import cleaning from "../assets/cleaning.jpg";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import qr from "../assets/qr.png";

export function Services() {
  const [activeService, setActiveService] = useState<any>(null);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [showQR, setShowQR] = useState(false);

  const services = [
    {
      title: "Tiffin Service",
      provider: "Sharma Tiffins",
      phone: "9876543210",
      location: "Near MIT WPU",
      image: tiffin,
      prices: ["₹300/month", "₹80/day", "₹30/meal"],
    },
    {
      title: "Laundry Service",
      provider: "QuickWash Laundry",
      phone: "9123456780",
      location: "Karve Nagar",
      image: laundry,
      prices: ["₹500/month", "₹100/load", "₹20/item"],
    },
    {
      title: "Room Cleaning",
      provider: "CleanPro Services",
      phone: "9988776655",
      location: "Kothrud",
      image: cleaning,
      prices: ["₹1000/month", "₹150/visit", "₹50/room"],
    },
  ];

  // 🔥 NEW SAVE FUNCTION
  const saveBooking = async (paymentStatus: string) => {
    try {
      await addDoc(collection(db, "serviceBookings"), {
        service: activeService.title,
        name,
        room,
        price: selectedPrice,
        payment,
        paymentStatus,
        status: "Pending",
        createdAt: new Date(),
      });

      alert("Booking Saved ✅");

      setActiveService(null);
      setShowQR(false);
      setName("");
      setRoom("");
      setSelectedPrice("");
      setPayment("");

    } catch (error) {
      console.error(error);
      alert("Error saving booking");
    }
  };

  // 🔥 UPDATED BOOKING HANDLER
  const handleBooking = async () => {
    if (!name || !room || !selectedPrice || !payment) {
      alert("Please fill all details");
      return;
    }

    if (payment === "UPI") {
      setShowQR(true);
      return;
    }

    saveBooking("paid");
  };

  return (
    <div className="px-10 py-12 min-h-screen bg-gray-50">

      <h1 className="text-2xl font-semibold text-center mb-10">
        Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col justify-between h-[380px]"
          >

            <div className="h-40 rounded-xl overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-2">

              <h2 className="text-lg font-semibold text-gray-800">
                {service.title}
              </h2>

              <p className="text-sm text-gray-600">
                👤 {service.provider}
              </p>

              <p className="text-sm text-gray-500">
                📍 {service.location}
              </p>

              <p className="text-sm text-gray-500">
                📞 {service.phone}
              </p>

            </div>

            <button
              onClick={() => setActiveService(service)}
              className="mt-4 bg-blue-600 text-white py-2 rounded-xl"
            >
              Book Now
            </button>

          </div>
        ))}

      </div>

      {/* 🔥 BOOKING POPUP */}
      {activeService && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              {activeService.title}
            </h2>

            <div className="flex gap-2 flex-wrap mb-4">
              {activeService.prices.map((price: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedPrice(price)}
                  className={`px-3 py-1 rounded border ${
                    selectedPrice === price
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {price}
                </button>
              ))}
            </div>

            <input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />

            <input
              placeholder="Room Number"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">Select Payment</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Cash</option>
            </select>

            <button
              onClick={handleBooking}
              className="w-full bg-green-600 text-white py-2 rounded-lg mb-2"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => setActiveService(null)}
              className="w-full bg-gray-400 text-white py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* 🔥 QR POPUP */}
      {showQR && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">

            <h2 className="text-lg font-semibold mb-4">
              Scan & Pay (UPI)
            </h2>

            <img src={qr} alt="QR" className="w-48 mx-auto mb-4" />

            <button
              onClick={() => saveBooking("paid")}
              className="w-full bg-green-600 text-white py-2 rounded mb-2"
            >
              I Have Paid
            </button>

            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-gray-400 text-white py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
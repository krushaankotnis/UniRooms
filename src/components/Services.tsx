import React, { useState } from "react";
import tiffin from "../assets/tiffin.jpg";
import laundry from "../assets/laundry.jpg";
import cleaning from "../assets/cleaning.jpg";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [payment, setPayment] = useState("");

  const services = [
    {
      title: "Tiffin Service",
      provider: "Sharma Tiffins",
      phone: "9876543210",
      location: "Near MIT WPU",
      image: tiffin,
      time: "8:00 AM - 10:00 PM",
      prices: ["₹300/month", "₹80/day", "₹30/meal"],
    },
    {
      title: "Laundry Service",
      provider: "QuickWash Laundry",
      phone: "9123456780",
      location: "Karve Nagar",
      image: laundry,
      time: "9:00 AM - 8:00 PM",
      prices: ["₹500/month", "₹100/load", "₹20/item"],
    },
    {
      title: "Room Cleaning",
      provider: "CleanPro Services",
      phone: "9988776655",
      location: "Kothrud",
      image: cleaning,
      time: "7:00 AM - 6:00 PM",
      prices: ["₹1000/month", "₹150/visit", "₹50/room"],
    },
  ];

  const handleBooking = async (service: string) => {
  if (!name || !room || !selectedPrice || !payment) {
    alert("Please fill all details");
    return;
  }

  try {
    await addDoc(collection(db, "serviceBookings"), {
      service,
      name,
      room,
      price: selectedPrice,
      payment,
      status: "Pending",
      createdAt: new Date(),
    });

    alert("Booking Saved ✅");

    setActiveIndex(null);
    setName("");
    setRoom("");
    setSelectedPrice("");
    setPayment("");

  } catch (error) {
    console.error(error);
    alert("Error saving booking");
  }
};

  return (
    <div className="px-6 py-10 min-h-screen bg-gray-50">

      <h1 className="text-3xl font-bold text-center mb-10">
        Book Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden border shadow-md hover:shadow-xl transition"
          >

            {/* IMAGE */}
            <div className="h-48">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-lg font-semibold mb-2">
                {service.title}
              </h2>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Provider:</strong> {service.provider}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                📍 {service.location}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                📞 {service.phone}
              </p>

              <p className="text-sm text-gray-500 mb-3">
                ⏰ {service.time}
              </p>

              {/* PRICE OPTIONS */}
              <div className="mb-3">
                {service.prices.map((price, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPrice(price)}
                    className={`mr-2 mb-2 px-3 py-1 border rounded ${
                      selectedPrice === price
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>

              {/* BOOK BUTTON */}
              {activeIndex !== index && (
                <button
                  onClick={() => setActiveIndex(index)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  Book Service
                </button>
              )}

              {/* BOOKING FORM */}
              {activeIndex === index && (
                <div className="mt-3 space-y-2">

                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded"
                  />

                  <input
                    type="text"
                    placeholder="Room Number"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full border p-2 rounded"
                  />

                  {/* PAYMENT OPTIONS */}
                  <select
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Payment Method</option>
                    <option>UPI</option>
                    <option>Card</option>
                    <option>Cash</option>
                  </select>

                  <button
                    onClick={() => handleBooking(service.title)}
                    className="w-full bg-green-600 text-white py-2 rounded"
                  >
                    Confirm Booking
                  </button>

                  <button
                    onClick={() => setActiveIndex(null)}
                    className="w-full bg-gray-400 text-white py-2 rounded"
                  >
                    Cancel
                  </button>

                </div>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Page } from "../App";

interface Props {
  navigateTo: (page: Page) => void;
}

export function ReviewsPage({ navigateTo }: Props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const hostel = JSON.parse(localStorage.getItem("selectedHostel") || "null");

  const submitReview = async () => {
    if (!name || !rating || !comment) {
      alert("Fill all fields");
      return;
    }

    await addDoc(collection(db, "reviews"), {
      hostelId: hostel?.id,
      studentName: name,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
      createdAt: serverTimestamp(),
    });

    alert("Review submitted ✅");
    navigateTo("hostel-details");
  };

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Write Review</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Rating */}
          <div className="flex gap-2">
            {[1,2,3,4,5].map((num) => (
              <button
                key={num}
                onClick={() => setRating(num)}
                className={`text-2xl ${
                  rating >= num ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button onClick={submitReview} className="w-full">
            Submit Review
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}
// src/app/components/EntryForm.js
"use client";

import { useState } from "react";
import { db } from "@/utils/firebase";
import { addDoc, collection } from "firebase/firestore";

const predefinedCategories = ["Food", "Clothing", "Transport", "Housing", "Education"];

export default function EntryForm() {
  const [category, setCategory] = useState("");
  const [entry, setEntry] = useState("");
  const [name, setName] = useState(""); 
  const [contact, setContact] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "needs"), {
        category,
        entry,
        user: {
          name,
          contact,
        },
      });
      setCategory("");
      setEntry("");
      setName("");
      setContact("");
      alert("Entry submitted successfully!");
    } catch (error) {
      console.error("Error submitting entry:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>
          Select a category
        </option>
        {predefinedCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Describe your request or offer"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Your Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your Contact Info (optional)"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

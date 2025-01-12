"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/utils/firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const Entries = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [need, setNeed] = useState("");
  const [user, setUser] = useState("");
  const [needsList, setNeedsList] = useState([]);

  // Fetch predefined categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !need || !user) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const newDoc = await addDoc(collection(db, "needs"), {
        category: selectedCategory,
        entry: need,
        user: user,
        timestamp: serverTimestamp(), // Add timestamp here
      });

      alert("Need submitted successfully!");

      setNeed("");
      setUser("");
      setSelectedCategory("");

      // Add new entry to needsList with placeholder timestamp until Firestore syncs
      setNeedsList([
        ...needsList,
        {
          category: selectedCategory,
          entry: need,
          user: user,
          timestamp: new Date(), // Temporary timestamp
        },
      ]);
    } catch (error) {
      console.error("Error submitting need:", error);
      alert("Failed to submit need.");
    }
  };

  // Format the timestamp for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    return timestamp instanceof Date
      ? timestamp.toLocaleString()
      : new Date(timestamp).toLocaleString();
  };

  return (
    <div>
      <h3>Submit a Need</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Need:
          <input
            type="text"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="Describe your need"
          />
        </label>
        <label>
          User:
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <h3>Needs List</h3>
      {needsList.length > 0 ? (
        <ul>
          {needsList.map((item, index) => (
            <li key={index}>
              <strong>{item.category}:</strong> {item.entry} by {item.user} on{" "}
              {formatTimestamp(item.timestamp)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No entries available.</p>
      )}
    </div>
  );
};

export default Entries;

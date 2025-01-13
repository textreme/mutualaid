"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/utils/firebase";
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";

const Entries = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [need, setNeed] = useState("");
  const [user, setUser] = useState("");
  const [needsList, setNeedsList] = useState([]);
  const [filteredNeeds, setFilteredNeeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "timestamp", order: "desc" });

  // Fetch predefined categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch needs from Firestore and convert timestamps
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "needs"), orderBy("timestamp", "desc")));
        const needsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            timestamp: data.timestamp?.toDate() || null, // Convert Firestore timestamp to Date
          };
        });
        setNeedsList(needsData);
        setFilteredNeeds(needsData); // Initialize filteredNeeds
      } catch (error) {
        console.error("Error fetching needs:", error);
      }
    };

    fetchNeeds();
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
        timestamp: serverTimestamp(), // Add timestamp
      });

      alert("Need submitted successfully!");

      setNeed("");
      setUser("");
      setSelectedCategory("");

      // Add new entry to needsList with placeholder timestamp
      const newEntry = {
        id: newDoc.id,
        category: selectedCategory,
        entry: need,
        user: user,
        timestamp: new Date(), // Temporary timestamp
      };
      setNeedsList((prevNeeds) => [newEntry, ...prevNeeds]);
      setFilteredNeeds((prevNeeds) => [newEntry, ...prevNeeds]);
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

  // Handle filtering by category
  const handleFilterByCategory = (category) => {
    if (category === "") {
      setFilteredNeeds(needsList); // Reset to all needs
    } else {
      setFilteredNeeds(needsList.filter((need) => need.category === category));
    }
  };

  // Handle dynamic sorting
  const handleSort = (key) => {
    const newOrder = sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc";
    setSortConfig({ key, order: newOrder });

    const sortedNeeds = [...filteredNeeds].sort((a, b) => {
      if (key === "timestamp") {
        return newOrder === "asc" ? a.timestamp - b.timestamp : b.timestamp - a.timestamp;
      }
      if (key === "category") {
        return newOrder === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });
    setFilteredNeeds(sortedNeeds);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const searchedNeeds = needsList.filter(
      (need) =>
        need.category.toLowerCase().includes(lowercasedTerm) ||
        need.entry.toLowerCase().includes(lowercasedTerm) ||
        need.user.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredNeeds(searchedNeeds);
  };

  return (
    <div className="space-y-8">
      {/* Needs Entry Section */}
      <section className="p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Submit a Need</h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-4 items-center justify-start"
        >
          {/* Category Input */}
          <label className="flex flex-col w-40">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-black p-2 border rounded"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.id}
                </option>
              ))}
            </select>
          </label>

          {/* Need Input */}
          <label className="flex flex-col flex-grow">
            <input
              type="text"
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              placeholder="Describe your need"
              className="text-black p-2 border rounded"
            />
          </label>

          {/* User Input */}
          <label className="flex flex-col w-40">
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Contact"
              className="text-black p-2 border rounded"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="p-2 border border-white rounded text-white"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Needs List Section */}
      <section className="p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Needs</h3>
        <div className="flex justify-between items-center mb-4">
          {/* Filter */}
          <label className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by </span>
            <select
              onChange={(e) => handleFilterByCategory(e.target.value)}
              className="text-black p-2 border rounded"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.id}
                </option>
              ))}
            </select>
          </label>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Sort by </span>
            <button
              onClick={() => handleSort("category")}
              className="border border-gray-300 rounded px-4 py-1 flex items-center gap-2"
            >
              Category {sortConfig.key === "category" && (sortConfig.order === "asc" ? "⬆" : "⬇")}
            </button>
            <button
              onClick={() => handleSort("timestamp")}
              className="border border-gray-300 rounded px-4 py-1 flex items-center gap-2"
            >
              Time {sortConfig.key === "timestamp" && (sortConfig.order === "asc" ? "⬆" : "⬇")}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Needs"
            className="w-full p-2 border border-gray-300 rounded text-black"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

{/* Needs List */}
<ul className="space-y-2 mt-4">
  {filteredNeeds.length > 0 ? (
    filteredNeeds.map((item) => (
      <li key={item.id} className="p-2 rounded">
        <div className="flex justify-between">
          {/* Left-aligned category and entry */}
          <div>
            <strong>{item.category}:</strong> {item.entry}
          </div>
          {/* Right-aligned user and timestamp */}
          <div className="text-right">
            <p>{item.user}</p>
            <p>{formatTimestamp(item.timestamp)}</p>
          </div>
        </div>
      </li>
    ))
  ) : (
    <p>No entries available.</p>
  )}
</ul>

      </section>
    </div>
  );
};

export default Entries;

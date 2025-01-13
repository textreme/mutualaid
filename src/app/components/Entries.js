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

  // Handle search
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredNeeds(needsList); // Reset to all needs
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      setFilteredNeeds(
        needsList.filter(
          (need) =>
            need.entry.toLowerCase().includes(lowerCaseSearch) ||
            need.category.toLowerCase().includes(lowerCaseSearch) ||
            need.user.toLowerCase().includes(lowerCaseSearch)
        )
      );
    }
  }, [searchTerm, needsList]);

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

  // Handle sorting
  const handleSort = (key, order = "asc") => {
    const sortedNeeds = [...filteredNeeds].sort((a, b) => {
      if (key === "timestamp") {
        return order === "asc"
          ? a.timestamp - b.timestamp
          : b.timestamp - a.timestamp;
      }
      if (key === "category") {
        return order === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });
    setFilteredNeeds(sortedNeeds);
  };

  return (
    <div>
      <h3>Search Needs</h3>
      <div>
        <input
          type="text"
          placeholder="Search by need, category, or user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-black border p-2 w-full"
        />
      </div>
      <h3>Submit a Need</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-black">
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.id}
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
            className="text-black"/>
        </label>
        <label>
          User:
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Contact" className="text-black"
          />
        </label>
        <button type="submit" className="border border-gray-300 rounded">Submit</button>
      </form>

      <h3>Filter and Sort</h3>
      <div>
        <label>
          Filter by Category:
          <select
            onChange={(e) => handleFilterByCategory(e.target.value)}
            className="text-black">
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.id}
              </option>
            ))}
          </select>
        </label>
        Sort by:
        Category:
        <button onClick={() => handleSort("category", "asc")} className="border border-gray-300 rounded">&darr;A-Z</button>
        <button onClick={() => handleSort("category", "desc")} className="border border-gray-300 rounded">&uarr;Z-A</button>
        Time:
        <button onClick={() => handleSort("timestamp", "asc")} className="border border-gray-300 rounded">&darr;Oldest First</button>
        <button onClick={() => handleSort("timestamp", "desc")} className="border border-gray-300 rounded">&uarr;Newest First</button>
      </div>

      <h3>Needs List</h3>
      {filteredNeeds.length > 0 ? (
        <ul>
          {filteredNeeds.map((item) => (
            <li key={item.id}>
              <strong>{item.category}:</strong> {item.entry} by {item.user} on {" "}
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

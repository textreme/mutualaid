"use client";

import { useState, useEffect } from "react";
import { db } from "@/app/utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const Entries = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [need, setNeed] = useState("");
  const [user, setUser] = useState("");
  const [needsList, setNeedsList] = useState([]);
  const [filteredNeeds, setFilteredNeeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "timestamp", order: "desc" });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = querySnapshot.docs.map((doc) => ({ id: doc.id }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "needs"), orderBy("timestamp", "desc"))
        );
        const needsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            timestamp: data.timestamp?.toDate() || null,
          };
        });
        setNeedsList(needsData);
        setFilteredNeeds(needsData);
      } catch (error) {
        console.error("Error fetching needs:", error);
      }
    };

    fetchNeeds();
  }, []);

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
        timestamp: serverTimestamp(),
      });

      const newEntry = {
        id: newDoc.id,
        category: selectedCategory,
        entry: need,
        user: user,
        timestamp: new Date(),
      };
      setNeedsList((prev) => [newEntry, ...prev]);
      setFilteredNeeds((prev) => [newEntry, ...prev]);

      setNeed("");
      setUser("");
      setSelectedCategory("");
      alert("Need submitted successfully!");
    } catch (error) {
      console.error("Error submitting need:", error);
      alert("Failed to submit need.");
    }
  };

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

  const handleFilterByCategory = (category) => {
    if (category === "") {
      setFilteredNeeds(needsList);
    } else {
      setFilteredNeeds(needsList.filter((need) => need.category === category));
    }
  };

  const handleSort = (key) => {
    const order =
      sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc";
    setSortConfig({ key, order });
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

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    return timestamp instanceof Date
      ? timestamp.toLocaleString()
      : new Date(timestamp).toLocaleString();
  };

  return (
    <div className="grid gap-8">
      {/* Needs Entry Section */}
      <section className="p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Submit a Need</h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2.5fr_0.25fr_0.25fr] gap-4 items-center"
        >
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded text-black"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.id}
              </option>
            ))}
          </select>
          <div className="relative">
            <input
              type="text"
              value={need}
              onChange={(e) => {
                if (e.target.value.length <= 98) {
                  setNeed(e.target.value);
                }
              }}
              placeholder="Describe your need, be specific (max 98 characters)"
              className="p-2 border rounded text-black w-full"
            />
            <p className="text-sm text-gray-500 absolute right-2 top-2">
              {98 - need.length} chars left
            </p>
          </div>
          <input
            type="tel"
            value={user}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
              if (value.length <= 10) {
                setUser(value);
              }
            }}
            placeholder="123-456-7890"
            className="p-2 border rounded text-black"
          />
          <button
            type="submit"
            className="p-2 border border-white rounded text-white hover:bg-gray-700"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Needs List Section */}
      <section className="p-4 rounded">
        <h3 className="text-xl font-semibold mb-4">Needs</h3>
        {/* Filter/Search/Sort */}
        <div className="grid grid-cols-[0.5fr_2fr_1fr_0.25fr] gap-4 items-center pb-4">
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

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search category, needs or users..."
            className="text-black p-2 border rounded"
          />
          <div></div>
          <button
            onClick={() => handleSort("timestamp")}
            className="text-white border border-white rounded px-4 py-2"
          >
            Time {sortConfig.order === "asc" ? "⬆" : "⬇"}
          </button>
        </div>

        {/* Needs Entries */}
        <ul className="grid gap-2">
          {filteredNeeds.length > 0 ? (
            filteredNeeds.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[0.5fr_2.5fr_0.5fr_0.75fr] items-center gap-4 p-2 rounded"
              >
                <span className="whitespace-normal break-words">{item.category}</span>
                <span className="whitespace-normal break-words">{item.entry}</span>
                <span className="whitespace-normal break-words text-right">{item.user}</span>
                <span className="whitespace-normal break-words text-right">
                  {formatTimestamp(item.timestamp)}
                </span>
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

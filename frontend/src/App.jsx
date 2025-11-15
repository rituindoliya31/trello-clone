import React, { useState, useEffect } from "react";
import axios from "axios";
import BoardView from "./components/BoardView";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const App = () => {
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${API}/api/cards`);
      setCards(res.data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  const addCard = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      await axios.post(`${API}/api/cards`, { title });
      setTitle("");
      fetchCards();
    } catch (err) {
      console.error("Error adding card:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Trello Clone Dashboard
      </h1>

      <form onSubmit={addCard} className="flex justify-center mb-6">
        <input
          className="border p-2 rounded-l-md w-64 focus:outline-none"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700"
        >
          Add
        </button>
      </form>

      <BoardView cards={cards} />
    </div>
  );
};

export default App;

import React from "react";

const CardItem = ({ card }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
      <p className="text-sm text-gray-500 mt-2">
        Status: <span className="text-indigo-600">{card.status || "Pending"}</span>
      </p>
    </div>
  );
};

export default CardItem;

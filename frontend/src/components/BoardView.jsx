import React from "react";
import CardItem from "./CardItem";

const BoardView = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {cards.map((card) => (
        <CardItem key={card._id} card={card} />
      ))}
    </div>
  );
};

export default BoardView;

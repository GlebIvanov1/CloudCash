import React from "react";

interface GoalsCardsType {
  price: number;
  date: string;
  type: string;
}

const GoalsCards: React.FC<GoalsCardsType> = ({ price, date, type }) => {
  return (
    <>
      <div className="GoalsCardWrapper">
        <h3 className="Price">${price}</h3>
        <p className="date">{date}</p>
        <img src="/Imgs/HolidayIImg.svg" alt="type" />
        <h2 className="Type">{type}</h2>
      </div>
    </>
  );
};

export default GoalsCards;

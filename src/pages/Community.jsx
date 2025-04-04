import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import testimg1 from "../assets/react.svg";
import testimg2 from "../../public/vite.svg";

function Community() {
  const simulateCardData = [
    { id: 1, image: testimg1, title: "Card 1", description: "This is the first card" },
    { id: 2, image: testimg2, title: "Card 2", description: "This is the second card" },
    { id: 3, image: testimg1, title: "Card 3", description: "This is the third card" },
    { id: 4, image: testimg2, title: "Card 4", description: "This is the fourth card" },
    { id: 5, image: testimg1, title: "Card 5", description: "This is the fifth card" },
    { id: 6, image: testimg2, title: "Card 6", description: "This is the sixth card" },
  ];
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d");
    setCardData(simulateCardData);
  }, []);
  // console.log(cardData);

  return (
    <div className="community">
      {cardData.map((card) => (
        <Card key={card.id} image={card.image} title={card.title} description={card.description} />
      ))}
    </div>
  );
}
export default Community;
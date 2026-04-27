import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_URL;

export default function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`https://rest.coincap.io/v3/assets/${id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
      .then((res) => res.json())
      .then((data) => setCoin(data.data));

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (!coin) return <p>Loading...</p>;

  return (
    <div>
      <h1>
        {coin.name} ({coin.symbol})
      </h1>
      <p>Rank: {coin.rank}</p>
      <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p>Market Cap: ${parseFloat(coin.marketCapUsd).toFixed(0)}</p>
      <p>24h Change: {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

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
    <div className="coin-detail">
      <h1>
        {coin.name}{" "}
        <span style={{ color: "var(--muted)", fontSize: "1rem" }}>
          {coin.symbol}
        </span>
      </h1>
      <p>
        Rank <span>#{coin.rank}</span>
      </p>
      <p>
        Price <span>${parseFloat(coin.priceUsd).toFixed(2)}</span>
      </p>
      <p>
        Market Cap <span>${parseFloat(coin.marketCapUsd).toFixed(0)}</span>
      </p>
      <p>
        24h Change{" "}
        <span
          className={
            parseFloat(coin.changePercent24Hr) >= 0 ? "positive" : "negative"
          }
        >
          {parseFloat(coin.changePercent24Hr).toFixed(2)}%
        </span>
      </p>
      <button onClick={toggleFavorite} className={isFavorite ? "active" : ""}>
        {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_URL;

export default function Favorites() {
  const [favoriteCoins, setFavoriteCoins] = useState([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (ids.length === 0) {
      setFavoriteCoins([]);
      return;
    }

    fetch("https://rest.coincap.io/v3/assets?limit=200", {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.data.filter((coin) => ids.includes(coin.id));
        setFavoriteCoins(filtered);
      });
  }, []);

  if (favoriteCoins.length === 0)
    return <p>No tienes criptomonedas favoritas.</p>;

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favoriteCoins.map((coin) => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>
              {coin.name} ({coin.symbol}) — $
              {parseFloat(coin.priceUsd).toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

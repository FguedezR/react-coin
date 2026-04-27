import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_URL;

export default function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch("https://rest.coincap.io/v3/assets?limit=20", {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
      .then((res) => res.json())
      .then((data) => setCoins(data.data));
  }, []);

  return (
    <div>
      <h1>Top Cryptocurrencies</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            <Link to={`/coin/${coin.id}`}>
              {coin.rank}. {coin.name} ({coin.symbol}) - $
              {parseFloat(coin.priceUsd).toFixed(2)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

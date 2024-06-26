import React, { useState, useEffect, useContext } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null); // Initialize with null
  const [historicalData, setHistoricalData] = useState(null); // Initialize with null
  const { currency } = useContext(CoinContext);

  useEffect(() => {
    const fetchCoinData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-rza4jhz3Axq7LZ3CbnLBEzrB",
        },
      };

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          options
        );
        if (response.ok) {
          const data = await response.json();
          setCoinData(data);
        } else {
          throw new Error("Failed to fetch coin data");
        }
      } catch (err) {
        console.error("Error fetching coin data:", err);
        // Optionally handle error state or display error message
      }
    };

    const fetchHistoricalData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-rza4jhz3Axq7LZ3CbnLBEzrB",
        },
      };

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
          options
        );
        if (response.ok) {
          const data = await response.json();
          setHistoricalData(data);
        } else {
          throw new Error("Failed to fetch historical data");
        }
      } catch (err) {
        console.error("Error fetching historical data:", err);
        // Optionally handle error state or display error message
      }
    };

    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency]); // Dependency array includes coinId and currency for useEffect

  if (!coinData || !historicalData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>
            {currency.symbol}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24 Hour low</li>
          <li>
            {currency.symbol}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;

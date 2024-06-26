import React, { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async (currencyName) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-rza4jhz3Axq7LZ3CbnLBEzrB",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyName}`,
        options
      );
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllCoin(currency.name);
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;

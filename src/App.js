import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

function App() {
  const [todoText, setTodoText] = useState('');
  const coins = useSelector(state => state.coins);
  const dispatch = useDispatch();

  async function loadCoins() {
    try {
      const response = await axios.get("https://economia.awesomeapi.com.br/all/");

      const data = Object.values(response.data)

      return dispatch({ type: "INITIAL_VALUE", payload: data }) && setTodoText('')

    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    loadCoins()
  }, [])

  return (
    <div className="bg-dark d-flex flex-column justify-content-center align-items-center" style={{ position: "relative", width: '100%', height: '100%', minHeight: '100vh' }}>
      <div className="mb-4 d-flex">
        <img src={require("./coins.svg")} alt="" width={50} height={50} />
        <h1 className="text-warning ml-4" style={{ fontSize: '46px' }}>Coins price</h1>
      </div>
      <ul className="d-flex flex-wrap" style={{ listStyle: 'none' }}>
        {coins.map(coin => (
          <li className="mb-2 d-flex flex-column bg-primary rounded-lg p-2 m-2" key={coin.id}>
            <span className="text-white text-monospace font-weight-bold mr-4" style={{ fontSize: '22px' }}>{coin.code}</span>
            <span className="text-white text-monospace font-weight-bold mr-4">{coin.bid}</span>
            <span className="text-warning text-monospace font-weight-bold mr-4">{coin.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

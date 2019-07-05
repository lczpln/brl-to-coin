import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './index.css';

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
    <div className="bg-dark" style={{ position: "relative", width: '100%', height: '100%', minHeight: '100vh' }}>
      <div className="d-flex py-4 align-items-center justify-content-center">
        <h1 className="text-warning" style={{ fontSize: '46px' }}>C<img src={require("./coins.svg")} alt="" width={40} height={40} />INS PRICE</h1>
      </div>
      <ul className="grid p-0" style={{ listStyle: 'none' }}>
        {coins.map(coin => (
          <li className="d-flex flex-column bg-primary rounded-lg p-2" key={coin.id}>
            <span className="text-white text-monospace font-weight-bold mr-4" style={{ fontSize: '22px' }}>{coin.code}</span>
            <div className="d-flex justify-content-between">
              <span className="text-white text-monospace font-weight-bold mr-4">{coin.bid} </span>
              <div>
                <span className="text-white text-monospace font-weight-bold mr-2" style={{ fontSize: '14px' }}>{` %${coin.pctChange.split("-")[1] ? coin.pctChange.split("-")[1] : coin.pctChange}`}</span>
                <img src={coin.pctChange > 0 ? require("./up.svg") : require("./down.svg")} alt="" height={20} width={20} />
              </div>
            </div>

            <span className="text-warning text-monospace font-weight-bold mr-4">{coin.name}</span>
            <span className="text-grey text-monospace font-weight-bold mr-4">{coin.create_date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

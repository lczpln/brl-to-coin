import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./index.css";

import axios from "axios";

function App() {
    const [selected, setSelected] = useState('');
    const [selectedEffect, setSelectedEffect] = useState('animated flipInY');
    const [lastSelected, setLastSelected] = useState('');
    const [lastSelectedEffect, setLastSelectedEffect] = useState('animated flipInX');
    const coins = useSelector(state => state.coins);
    const dispatch = useDispatch();

    var intervalRefresh = null;

    async function loadCoins() {
        try {
            const response = await axios.get(
                "https://economia.awesomeapi.com.br/all/"
            );

            const data = Object.values(response.data);

            return dispatch({ type: "INITIAL_VALUE", payload: data });
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        loadCoins();
        refreshValues();
    }, []);

    function refreshValues() {
        clearInterval(intervalRefresh);
        intervalRefresh = setInterval(() => { loadCoins(); refreshValues() }, 10 * 1000)
    }

    function setNewSelected(id) {
        selected && setLastSelected(selected)
        selected === id
            ? setSelected('')
            : setSelected(id)
    }

    return (
        <div className="bg-dark" style={{ position: "relative", width: "100%", height: "100%", minHeight: "100vh" }}>
            <div className="d-flex py-4 align-items-center justify-content-center">
                <h1 className="text-warning" style={{ fontSize: "45px" }}>
                    C<img src={require("./coins.svg")} alt="" width={40} height={40} />INS PRICE
                </h1>
            </div>
            <ul className="grid p-0" style={{ listStyle: "none" }}>
                {coins.map((coin, _) => (
                    <li
                        key={_}
                        className={`${selected === _ && selectedEffect || lastSelected === _ && lastSelectedEffect} d-flex flex-column bg-primary rounded-lg p-2 shadow-lg`}
                        onClick={() => setNewSelected(_)}
                    >
                        {selected !== _ ? (
                            <Fragment>
                                <span className="text-white text-monospace font-weight-bold mr-4" style={{ fontSize: "22px" }}>
                                    {coin.code}
                                </span>
                                <div className="d-flex justify-content-between">
                                    <span className="text-white text-monospace font-weight-bold mr-4">
                                        {coin.bid}
                                    </span>
                                    <div>
                                        <span className="text-monospace font-weight-bold mr-2" style={{ color: coin.pctChange > 0 ? '#4AD991' : '#FF6565' }}>
                                            {` 
                                                %${coin.pctChange.split("-")[1]
                                                    ? coin.pctChange.split("-")[1]
                                                    : coin.pctChange
                                                }
                                            `}
                                        </span>
                                        <img
                                            src={
                                                coin.pctChange > 0
                                                    ? require("./up.svg")
                                                    : require("./down.svg")
                                            }
                                            alt=""
                                            height={20}
                                            width={20}
                                        />
                                    </div>
                                </div>
                                <span className="text-warning text-monospace font-weight-bold mr-4">
                                    {coin.name}
                                </span>
                                <span className="text-grey text-monospace font-weight-bold mr-4">
                                    {coin.create_date}
                                </span>
                            </Fragment>
                        ) : (
                                <Fragment>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-white text-monospace font-weight-bold" style={{ fontSize: "22px", width: 10 }}>Now:</span>
                                        <span className="text-white text-monospace font-weight-bold" style={{ fontSize: '22px' }}>{coin.bid}</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-white text-monospace font-weight-bold" style={{ display: 'flex', width: 120, margin: 0 }}>High:</span>
                                        <div>
                                            <span className="text-white text-monospace font-weight-bold mr-2" style={{ fontSize: '14px' }}>{coin.high}</span>
                                            <img
                                                src={require("./up.svg")}
                                                alt=""
                                                height={20}
                                                width={20}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-white text-monospace font-weight-bold" style={{ display: 'flex', width: 120, margin: 0 }}>Low:</span>
                                        <div>
                                            <span className="text-white text-monospace font-weight-bold mr-2" style={{ fontSize: '14px' }}>{coin.low}</span>
                                            <img
                                                src={require("./down.svg")}
                                                alt=""
                                                height={20}
                                                width={20}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="text-white text-monospace font-weight-bold" style={{ display: 'flex', width: 120, margin: 0 }}>Projection:</span>
                                        <div>
                                            <span className="text-white text-monospace font-weight-bold mr-2" style={{ fontSize: '14px' }}>{coin.ask}</span>
                                            <img
                                                src={
                                                    coin.bid > coin.ask
                                                        ? require("./down.svg")
                                                        : require("./up.svg")
                                                }
                                                alt=""
                                                height={20}
                                                width={20}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-warning text-monospace font-weight-bold mr-4">
                                        {coin.name}
                                    </span>
                                </Fragment>
                            )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

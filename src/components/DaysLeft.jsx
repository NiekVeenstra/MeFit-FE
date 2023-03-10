import React from 'react'
import { useState, useEffect } from 'react';
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const DaysLeft = () => {
    const [days, setDays] = useState(0);
    const deadline = "March, 17, 2023";
    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    };
    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div Style="background-color: lightblue;  display: inline-block;
        margin-top: 25px;
        padding: 10px;
        text-align: center;
        width: 70px; " role="timer">
            <div Style="width: 25%; float: left;">
                <div Style="border-right: solid 1px rgba(255, 255, 255, 0.2);
  font-weight: 400;
  padding: 10px;">
                    <p id="day">{days < 10 ? "0" + days : days}</p>
                    <span className="text">Days</span>
                </div>
            </div>
        </div>
    )
}

export default DaysLeft
import React from 'react';
import { useState } from 'react';

const Button = () => {
    const [click, setClick] = useState(false);
    // console.log("ITEM", item,"TEXT", text)
    // add other functions if you want
    const handleClick = () => {
        setClick(!click);
    };
    return (
        <button onClick={handleClick} style={{ width: "6rem", border: "solid 2px", borderRadius: "15px", padding: "0.6rem", background: "blue", color: "white" }}>
            {click ? "clicked" : 'not clicked'}
        </button>
    );
}

export default Button







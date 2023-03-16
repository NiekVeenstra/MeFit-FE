import React from "react";
import { useState, useEffect } from "react";

const DaysLeft = () => {
  const [days, setDays] = useState(0);
  const deadline = "March, 28, 2023";
  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ee0c0c",
        display: "inline-block",
        marginTop: "25px",
        padding: "10px",
        textAlign: "center",
        width: "70px",
      }}
      role="timer"
    >
      <div style={{ width: "25%", float: "left" }}>
        <div
          style={{
            borderRight: "solid 1px rgba(255, 255, 255, 0.2)",
            fontWeight: "400",
            padding: "10px",
          }}
        >
          <p id="day">{days < 10 ? "0" + days : days}</p>
        </div>
      </div>
    </div>
  );
};

export default DaysLeft;

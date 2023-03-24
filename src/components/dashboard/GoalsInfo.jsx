import React from "react";
import Calendar from "./Calendar";
import ChoosenGoals from "./ChoosenGoals";
import DaysLeft from "./DaysLeft";

const GoalsInfo = () => {
  return (
    <div style={{ border: "solid 3px black", width: "700px" }}>
      GoalsInfo
      <div style={{ border: "solid 3px black", width: "250px" }}>How many goals this week <ChoosenGoals /></div>
      <div style={{ border: "solid 3px black", width: "250px" }}>
        Days left to complete your goals <DaysLeft />
      </div>
      <div>
        <Calendar />
      </div>
    </div>
  );
};

export default GoalsInfo;

// import React from 'react';
// import { useState, useEffect } from "react";
// import { getOneWorkout } from '../api/apiCall/workouts';
// import { updateWorkout } from '../api/apiCall/updateWorkout';
// import { useGoals, useWorkout } from '../context/UserContext';

// const Button2 = ({ item, index }) => {
//     const [click, setClick] = useState(false);
//     const { oneGoal, setOneGoal } = useGoals();
//     const { saveWorkout, setSaveWorkout } = useWorkout();

//     useEffect(() => {
//         const fetchData = async () => {
//             const oneGoalData = await getOneWorkout(item);
//             if (oneGoalData.id === item) {
//                 setOneGoal(oneGoalData);
//             }
//         };

//         fetchData();
//     }, [item, setOneGoal]);

//     const handleOneGoal = () => {
//         // Update the saveWorkout state with the updated workout item
//         setSaveWorkout((prevState) => {
//           return prevState.map((workout, idx) => {
//             if (idx === index) {
//               return {
//                 ...workout,
//                 complete: true,
//               };
//             }
//             return workout;
//           });
//         });
//       };

//     // saveWorkout[index].complete === true

//     return (

//         <button

//             onClick={() => {
//                 handleOneGoal(item);
//                 updateWorkout(item);
//                 setClick(!click);
//                 console.log(saveWorkout);
//                 setSaveWorkout({
//                     ...saveWorkout,
//                 })
//             }}
//             style={{
//                 width: "6rem",
//                 border: "solid 2px",
//                 borderRadius: "15px",
//                 padding: "0.6rem",
//                 background: "blue",
//                 color: "white",
//                 height: "45px",
//                 alignSelf: "center"

//             }}
//         >
//             {click ? "selected" : "not selected"}
//         </button>

//     );
// };

// export default Button2;

import React from "react";
import { useState, useEffect } from "react";
import { useGoals, useWorkout } from "../context/UserContext";

const Button2 = ({ index }) => {
  const [click, setClick] = useState(false);
  const { oneGoal, setOneGoal } = useGoals();
  const { saveWorkout, setSaveWorkout } = useWorkout();

  const handleOneGoal = (index) => {

    setSaveWorkout((prevState) => {
      return prevState.map((workout, idx) => {
        if (idx === index) {
          return {
            ...workout,
            complete: true,
          };
        }
        return workout;
      });
    });

  };

  return (
    <button
      onClick={() => {
        handleOneGoal(index);
        setClick(!click);
      }}
      style={{
        width: "6rem",
        border: "solid 2px",
        borderRadius: "15px",
        padding: "0.6rem",
        background: "blue",
        color: "white",
        height: "45px",
        alignSelf: "center",
      }}
    >
      {click ? "selected" : "not selected"}
    </button>
  );
};

export default Button2;

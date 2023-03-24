const apiUrl = process.env.REACT_APP_API_WORKOUTS;

export const getWorkouts = async () => {
  try {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      throw new Error(`could not complete request`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return [error.message, []];
  }
};
// const updateWorkout = async (id) => {
//   try {
//     const response = await fetch(`${apiUrl}/${id}}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ op: "replace", path: "/complete", value: "true" }),
//     })
//       .then((response) => response.json())
//       .then(function (workouts) {
//         console.log("Workout updated:", workouts);
//       });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // const data = await response.json();
//   } catch (error) {
//     console.error("Error updating workout:", error);
//   }
// };

// function Button2({ item, updateWorkout, getWorkouts }) {
//   const [clicked, setClicked] = useState(false);

//   const handleClick = () => {
//     updateWorkout(item.id);
//     getWorkouts();
//     setClicked(true);
//   };

//   return <button onClick={handleClick}>{clicked ? "Clicked" : "Not Clicked"}</button>;
// }

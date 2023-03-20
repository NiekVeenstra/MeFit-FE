const apiUrl = process.env.REACT_APP_API_WORKOUTS;



  export const getWorkouts = async () => {
    try {
      const response = await fetch(`${apiUrl}`);
      if (!response.ok) {
        throw new Error(`could not complete request`);
      }
      const data = await response.json();
      console.log(data);
      return  data;
    } catch (error) {
      return [error.message, []];
    }
  };
 

//   function Button2({ item, updateWorkout, getWorkouts }) {
//     const [clicked, setClicked] = useState(false);

//     const handleClick = () => {
//         updateWorkout(item.id);
//         getWorkouts();
//         setClicked(true);
//     };

//     return (
//         <button onClick={handleClick}>
//             {clicked ? 'Clicked' : 'Not Clicked'}
//         </button>
//     );
// }



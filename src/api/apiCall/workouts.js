
  export const getWorkouts = async () => {
    try {
      const response = await fetch('https://mefitapi-production.up.railway.app/api/workouts');
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
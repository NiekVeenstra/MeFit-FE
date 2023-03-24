export const updateWorkout = async (id) => {
    const url = `https://mefitapi-production.up.railway.app/api/Workouts/${id}`;
    const headers = {
      "Content-Type": "application/json-patch+json",
    };
    const patch = [
      {
        path: "/complete",
        op: "replace",
        value: "true",
      },
    ];
    fetch(url, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(patch),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      })
      .then((workouts) => {
        console.log('Workout updated:', workouts);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
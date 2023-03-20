const apiUrl = process.env.REACT_APP_API_WORKOUTS;


export async function updateWorkout(id) {
    const patchData = {
        op: "replace",
        path: "/complete",
        value: "true",
      };
    try {
        const response = await fetch(`${apiUrl}/${id}}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patchData),        })
            .then((response) => response.json())
            .then(function (workouts) { console.log('Workout updated:', workouts) });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error updating workout:', error);
    }
};
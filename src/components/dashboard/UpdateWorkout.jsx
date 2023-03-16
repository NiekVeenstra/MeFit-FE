const apiUrl = process.env.REACT_APP_API_WORKOUTS;

const updateWorkout = async (id) => {
    try {
        const response = await fetch(`${apiUrl / id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                complete: true
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Workout updated:', data);
    } catch (error) {
        console.error('Error updating workout:', error);
    }
};

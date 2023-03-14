import React, { useState, useEffect } from 'react';

function ProgressBar() {
  const [completedPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    fetch('https://mefitapi-production.up.railway.app/api/workouts')
      .then(response => response.json())
      .then(data => {
        // Calculate the percentage of completed workouts
        const completedWorkouts = data.filter(workouts => workouts.complete === true);
        const percentage = (completedWorkouts.length / data.length) * 100;
        setCompletedPercentage(percentage);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <p>Completed: {completedPercentage.toFixed(2)}%</p>
      <div>
        <progress value={completedPercentage} max="100" />
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${completedPercentage}%` }}></div>
      </div>
    </div>
  );
}

export default ProgressBar;





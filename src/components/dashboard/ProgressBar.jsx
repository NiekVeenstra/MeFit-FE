import React, { useState, useEffect } from 'react';
import { getWorkouts } from '../../api/apiCall/workouts';

function ProgressBar() {
  const [completedPercentage, setCompletedPercentage] = useState(0);

  const fetchData = async () => {
    const data = await getWorkouts();
    console.log(data);
    const completedWorkouts = data.filter((workouts) => workouts.complete === true);
    const percentage = (completedWorkouts.length / data.length) * 100;
    setCompletedPercentage(percentage);
  }
  useEffect(() => {
    fetchData();
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





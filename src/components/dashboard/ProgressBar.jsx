import React from 'react';

const GoalProgress = ({ progress }) => {
  return (
    <div>
      <h3>Goal Progress: {progress}%</h3>
      <progress value={progress} max="100" />
    </div>
  );
};
export default GoalProgress;


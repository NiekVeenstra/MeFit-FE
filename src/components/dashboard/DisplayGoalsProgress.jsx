const Progress = () => {
    const [goalData, setGoalData] = useState(null);
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      // fetch the user's goal data from an API or database
      const fetchData = async () => {
        const response = await fetch('/api/goals');
        const data = await response.json();
        setGoalData(data);
      };
      fetchData();
    }, []);
  
    useEffect(() => {
      // calculate the progress percentage based on the current status of the goal
      if (goalData) {
        const { current, target } = goalData;
        const progressPercentage = Math.round((current / target) * 100);
        setProgress(progressPercentage);
      }
    }, [goalData]);
  
    return (
      <div>
        {goalData ? (
          <div>
            <h2>{goalData.title}</h2>
            <p>{goalData.description}</p>
            <GoalProgress progress={progress} />
          </div>
        ) : (
          <p>Loading goal data...</p>
        )}
      </div>
    );
  };
  
  export default Progress;;
  
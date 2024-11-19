import { Typography } from "@mui/material";
import React, { useState } from "react";
import useInterval from "../../utils/timeUtils";

const Timer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date(Date.now()));

  useInterval(() => {
    setCurrentTime(new Date(Date.now()));
  }, 1000); // Update every second

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString();
  };

  return (
    <div>
      <Typography className="clock" gutterBottom variant="h1">
        {getCurrentTime()}
      </Typography>
    </div>
  );
};

export default Timer;

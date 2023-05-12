// pages/Schedule.tsx

import { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

type TimeUnit = "week" | "day";

class Task {
  constructor(
    public minTime: number,
    public maxTime: number,
    public frequency: number,
    public unit: TimeUnit,
    public multiple: number
  ) {}

  averageTime() {
    return (this.minTime + this.maxTime) / 2;
  }

  timePerWeek() {
    let weekFactor = this.unit === "week" ? 1 : 7;
    return this.averageTime() * this.frequency * weekFactor;
  }
}

class Child {
  constructor(public age: number, public breastfeeding: boolean) {}
}

class Family {
  constructor(
    public type: string,
    public children: Child[],
    public helpers: number,
    public pets: Record<string, number>,
    public house: House
  ) {}
}

class House {
  constructor(
    public bedrooms: number,
    public bathrooms: number,
    public livingRooms: number,
    public kitchen: number,
    public cars: number,
    public plants: number
  ) {}
}

const calculateTaskTime = (tasks: Task[]) => {
  let totalTime = 0;
  for (const task of tasks) {
    totalTime += task.timePerWeek();
  }
  return totalTime;
};

const generateRandomSchedule = (
  tasks: Task[],
  helpers: number,
  workStart: number,
  workEnd: number,
  workDays: number
) => {
  // ... implementation
};

const Schedule = () => {
  const [unit, setUnit] = useState<TimeUnit>("week");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(event.target.value as TimeUnit);
  };

  return (
    <motion.div className="container">
      <TextField
        id="unit-select"
        select
        label="Unit"
        value={unit}
        onChange={handleChange}
        variant="outlined"
      >
        <MenuItem value="week">Week</MenuItem>
        <MenuItem value="day">Day</MenuItem>
      </TextField>
    </motion.div>
  );
};

export default Schedule;

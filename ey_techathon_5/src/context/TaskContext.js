"use client";

import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Call Client A", description: "Follow up on proposal", status: "pending" },
    { id: 2, title: "Prepare Presentation", description: "Finalize slides for meeting", status: "pending" },
    { id: 3, title: "Submit Report", description: "Send Q4 performance report", status: "completed" },
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);

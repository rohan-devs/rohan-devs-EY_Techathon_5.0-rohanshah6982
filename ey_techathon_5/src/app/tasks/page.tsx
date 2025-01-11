"use client"
import { useState } from 'react';

function PendingTasksPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Call Client A', description: 'Follow up on proposal', status: 'pending' },
    { id: 2, title: 'Prepare Presentation', description: 'Finalize slides for meeting', status: 'pending' },
    { id: 3, title: 'Submit Report', description: 'Send Q4 performance report', status: 'completed' },
  ]);

  const markAsCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: 'completed' } : task
      )
    );
  };

  return (
    <div className="p-4  mx-auto w-full  min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Pending Tasks</h1>
      <div className="space-y-4">
        {tasks
          .filter((task) => task.status === 'pending')
          .map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white shadow rounded flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <button
                onClick={() => markAsCompleted(task.id)}
                className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
              >
                Mark as Done
              </button>
            </div>
          ))}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Completed Tasks</h2>
        <div className="space-y-2">
          {tasks
            .filter((task) => task.status === 'completed')
            .map((task) => (
              <div
                key={task.id}
                className="p-3 bg-gray-200 rounded text-gray-800"
              >
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-sm">{task.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PendingTasksPage;

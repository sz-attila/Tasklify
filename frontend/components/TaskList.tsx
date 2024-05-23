import React from "react";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, completed: boolean) => void;
  inProgressCount: number;
  completedCount: number;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusChange,
  inProgressCount,
  completedCount,
}) => {
  return (
    <div className="task-columns">
      <div className="task-column">
        <h2>Folyamatban ({inProgressCount})</h2>
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <div key={task._id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onStatusChange(task._id, !task.completed)}
              />
              <span>{task.title}</span>
            </div>
          ))}
      </div>
      <div className="task-column">
        <h2>Kész ({completedCount})</h2>
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <div key={task._id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onStatusChange(task._id, !task.completed)}
              />
              <span>{task.title}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;

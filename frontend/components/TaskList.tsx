import React from "react";
import Link from "next/link";

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
        <hr />
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <div key={task._id} className="task-item">
              <input
                type="checkbox"
                id={`task-${task._id}`}
                className="custom-checkbox"
                checked={task.completed}
                onChange={() => onStatusChange(task._id, !task.completed)}
              />
              <label htmlFor={`task-${task._id}`} className="task-label">
                <Link href={`/task/${task._id}`}>
                  <span className="task-link">{task.title}</span>
                </Link>
              </label>
            </div>
          ))}
      </div>
      <div className="task-column">
        <h2>Kész ({completedCount})</h2>
        <hr />
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <div key={task._id} className="task-item">
              <input
                type="checkbox"
                id={`task-${task._id}`}
                className="custom-checkbox"
                checked={task.completed}
                onChange={() => onStatusChange(task._id, !task.completed)}
              />
              <label htmlFor={`task-${task._id}`} className="task-label">
                <Link href={`/task/${task._id}`}>
                  <span className="completed-task">{task.title}</span>
                </Link>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;

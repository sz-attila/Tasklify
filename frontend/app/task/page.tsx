"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../../components/Button";
import "../../styles/globals.css";
import axios from "axios";
import TaskList from "../../components/TaskList";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInProgress, setShowInProgress] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
      fetchTasks(token);
    }
  }, [router]);

  useEffect(() => {
    handleFilterChange();
  }, [tasks, showInProgress, showCompleted, searchTerm]);

  const fetchTasks = async (token: string) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks/getTasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleFilterChange();
  };

  const handleFilterChange = () => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      if (!showInProgress) {
        filtered = filtered.filter((task) => task.completed);
      }
      if (!showCompleted) {
        filtered = filtered.filter((task) => !task.completed);
      }
    }

    setFilteredTasks(filtered);
  };

  const handleStatusChange = async (id: string, completed: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/updateTaskStatus/${id}`,
        { completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTask = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h1>AZ OLDAL ELÉRÉSÉHEZ JELENTKEZZ BE.</h1>
        <div className="submit-div">
          <Link href="/">
            <Button type="button">BEJELENTKEZÉS</Button>
          </Link>
          <p>Még nincs fiókod?</p>
          <div className="registration-link">
            <Link href="/register">
              <Button type="button">REGISZTRÁLJ</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inProgressCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="task-page">
      <div className="task-content">
        <div className="task-header">
          <h1>TEENDŐIM</h1>
          <p>Elvégzendő feladataidat itt tudod hozzáadni.</p>
        </div>
        <div className="task-button">
          <Button onClick={() => router.push("/add-task")} className="button">
            ÚJ FELADAT
          </Button>
        </div>
      </div>
      <div className="task-filters">
        <input
          type="text"
          placeholder="Keresés..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <input
            type="checkbox"
            id="inProgress"
            className="custom-checkbox"
            checked={showInProgress}
            onChange={() => setShowInProgress((prev) => !prev)}
          />
          <label htmlFor="inProgress">Folyamatban</label>
          <input
            type="checkbox"
            id="completed"
            className="custom-checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted((prev) => !prev)}
          />
          <label htmlFor="completed">Kész</label>
        </div>
      </div>
      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        inProgressCount={inProgressCount}
        completedCount={completedCount}
      />
    </div>
  );
};

export default TaskPage;

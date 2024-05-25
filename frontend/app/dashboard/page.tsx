"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
  Legend,
} from "recharts";
import "@/styles/globals.css";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const DashboardPage = () => {
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchTasks(token);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      const tasks: Task[] = response.data;
      setInProgressCount(tasks.filter((task) => !task.completed).length);
      setCompletedCount(tasks.filter((task) => task.completed).length);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const data = [
    { name: "Folyamatban", value: inProgressCount },
    { name: "Kész", value: completedCount },
  ];

  const COLORS = ["#ccdbdb", "#028c8c"];
  const TEXT_COLOR = "#011f27";

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="custom-legend">
        <ul>
          {payload.map((entry: any, index: number) => (
            <li key={`item-${index}`}>
              <span
                className="legend-color-box"
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.value} ({entry.payload.value} db)
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="task-header">
        <h1>DASHBOARD</h1>
        <p>
          Átláthatod, hogy eddig mennyi feladattal készültél el, és mennyi van
          még folyamatban.
        </p>
      </div>
      <div className="charts-container">
        <div className="chart bar-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 14,
                  fontWeight: "bold",
                  fill: TEXT_COLOR,
                }}
              />
              <YAxis domain={[0, 20]} tickCount={5} />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#028c8c"
                barSize={60}
                radius={[10, 10, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="value"
                  position="top"
                  fill={TEXT_COLOR}
                  style={{ fontWeight: "bold" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart pie-chart-container">
          <ResponsiveContainer width="100%" height={isMobile ? 350 : 300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={isMobile ? 90 : 110}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                content={renderCustomLegend}
                verticalAlign={isMobile ? "bottom" : "middle"}
                align={isMobile ? "center" : "right"}
                width={isMobile ? 0 : 220}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

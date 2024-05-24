"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Button from "../../components/Button";
import "../../styles/globals.css";

const AddTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/tasks/createTask",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/task");
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  return (
    <div className="add-task-container">
      <h1>ÚJ FELADAT</h1>
      <p>
        Add meg a feladat nevét és leírását, majd add hozzá a folyamatban lévő
        teendők közé.
      </p>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Feladat címe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Feladat leírása..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="add-task-button">
          <Button type="submit" className="button">
            HOZZÁAD
          </Button>
          <Link href="/task">
            <Button type="button" className="button-cancel">
              VISSZA A TEENDŐKHÖZ
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddTaskPage;

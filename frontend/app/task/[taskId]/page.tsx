"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Button from "@/components/Button";
import "@/styles/globals.css";
import { useModal } from "@/context/ModalContext";

const EditTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { isModalOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const { taskId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    fetchTask(token);
  }, [router, taskId]);

  const fetchTask = async (token: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const task = response.data;
      setTitle(task.title);
      setDescription(task.description);
    } catch (error) {
      console.error("Failed to fetch task", error);
    }
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/task");
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const handleDeleteTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      closeModal();
      router.push("/task");
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>BIZTOS SZERETNÉD TÖRÖLNI A FELADATOT?</h2>
            <p>
              Törlés után már nem fogod visszaállítani, és kezelni az alábbi
              teendőt.
            </p>
            <div className="button-group">
              <Button
                type="button"
                onClick={closeModal}
                className="button-undo"
              >
                MÉGSEM
              </Button>
              <Button
                type="button"
                onClick={handleDeleteTask}
                className="delete-button"
              >
                TÖRLÉS
              </Button>
            </div>
          </div>
        </div>
      )}
      <div
        className={
          isModalOpen ? "add-task-container blurred" : "add-task-container"
        }
      >
        <h1>FELADAT MÓDOSÍTÁSA</h1>
        <p>
          Ha megváltoztattad a feladat nevét, vagy leírását, ne felejtsd el
          elmenteni.
        </p>
        <form onSubmit={handleUpdateTask}>
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
          <Button type="submit" className="button">
            MENTÉS
          </Button>
          <div className="button-group">
            <Link href="/task">
              <Button type="button" className="button-undo">
                VISSZA
              </Button>
            </Link>
            <Button type="button" onClick={openModal} className="delete-button">
              TÖRLÉS
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPage;

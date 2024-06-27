// src/components/AddEditTask.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddEditTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setDueDate(new Date(res.data.dueDate).toISOString().substr(0, 10));
        } catch (err) {
          console.error("Error fetching task:", err);
        }
      };

      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      dueDate,
    };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
      } else {
        await axios.post("http://localhost:5000/api/tasks", task);
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <div>
      <h1>{id ? "Edit Task" : "Add Task"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">{id ? "Update" : "Add"} Task</button>
      </form>
    </div>
  );
};

export default AddEditTask;

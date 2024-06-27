import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskDetail.css";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    fetchTask();
  }, [id]);

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-detail">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <button onClick={deleteTask}>Delete Task</button>
    </div>
  );
};

export default TaskDetail;

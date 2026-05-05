import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    sort: "",
  });

  const loadTasks = async () => {
    const res = await getTasks(token, filters);
    setTasks(res || []);
  };

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const handleSubmitTask = async (formData) => {
    if (taskToEdit) {
      await updateTask(token, taskToEdit._id, formData);
      setTaskToEdit(null);
    } else {
      await createTask(token, formData);
    }
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(token, id);
    loadTasks();
  };

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Hola {user?.username}</p>
      <TaskForm
        onSubmitTask={handleSubmitTask}
        taskToEdit={taskToEdit}
        clearTaskToEdit={() => setTaskToEdit(null)}
      />
      <TaskFilters filters={filters} setFilters={setFilters} />
      <TaskList
        tasks={tasks}
        onEdit={setTaskToEdit}
        onDelete={handleDeleteTask}
      />
    </section>
  );
};

export default Dashboard;

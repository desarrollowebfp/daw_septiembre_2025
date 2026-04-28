import { useEffect, useState } from "react";

const TaskForm = ({ onSubmitTask, taskToEdit, clearTaskToEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    status: "pending",
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        date: taskToEdit.date?.slice(0, 10),
        status: taskToEdit.status,
      });
    }
  }, [taskToEdit]);

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmitTask(formData);
    setFormData({
      title: "",
      date: "",
      status: "pending",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Titulo"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="pending">Pendiente</option>
        <option value="completed">Completada</option>
      </select>
      <button type="submit">
        {taskToEdit ? "Guardar cambios" : "Crear tarea"}
      </button>
      {taskToEdit && (
        <button
          type="button"
          onClick={() => {
            clearTaskToEdit();
            setFormData({
              title: "",
              date: "",
              status: "pending",
            });
          }}
        >
          Cancelar edición
        </button>
      )}
    </form>
  );
};

export default TaskForm;

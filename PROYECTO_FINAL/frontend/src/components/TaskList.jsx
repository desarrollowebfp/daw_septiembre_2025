import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) {
    return <p>No hay tareas todavía</p>;
  }

  return (
    <section>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

export default TaskList;

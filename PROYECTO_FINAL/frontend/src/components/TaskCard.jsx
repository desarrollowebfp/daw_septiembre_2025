const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <article>
      <h3>{task.title}</h3>
      <p>{task.date?.slice(0, 10)}</p>
      <p>{task.status}</p>
      <button onClick={() => onEdit(task)}>Editar</button>
      <button onClick={() => onDelete(task._id)}>Borrar</button>
    </article>
  );
};

export default TaskCard
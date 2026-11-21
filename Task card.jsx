export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const getPriorityClass = (priority) => {
    if (priority === "High") return "priority-high";
    if (priority === "Medium") return "priority-medium";
    return "priority-low";
  };

  const getStatusClass = (status) => {
    if (status === "Completed") return "status-completed";
    if (status === "In progress") return "status-progress";
    return "status-todo";
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <span className={`status-badge ${getStatusClass(task.status)}`}>{task.status}</span>
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>{task.priority}</span>
      </div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-footer">
        <span className="due-date">{task.dueDate}</span>
        <div className="task-actions">
          <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value)}>
            <option>To do</option>
            <option>In progress</option>
            <option>Completed</option>
          </select>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

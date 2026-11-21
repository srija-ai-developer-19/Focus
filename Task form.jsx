import { useState, useEffect } from "react";

export default function TaskForm({ onSave, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, description, status, priority, dueDate });
    setTitle("");
    setDescription("");
    setStatus("To do");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? "Edit Task" : "Create New Task"}</h3>
      <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="form-row">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>To do</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <div className="form-actions">
        <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
        {editingTask && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

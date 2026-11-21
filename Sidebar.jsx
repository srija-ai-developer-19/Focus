export default function Sidebar({ currentView, setCurrentView }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "▦" },
    { id: "tasks", label: "My Tasks", icon: "✓" },
    { id: "calendar", label: "Calendar", icon: "▤" },
    { id: "notes", label: "Focus Notes", icon: "☰" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">FocusBoard</div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={currentView === item.id ? "nav-item active" : "nav-item"}
            onClick={() => setCurrentView(item.id)}
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>Stay focused</p>
      </div>
    </aside>
  );
}

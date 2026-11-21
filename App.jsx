import React, { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import FocusCarousel from './FocusCarousel.jsx'
import TaskCard from './TaskCard.jsx'
import TaskForm from './TaskForm.jsx'
import useLocalStorage from './useLocalstorage.jsx'
import { initialTasks } from './tasks.js'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard-tasks', initialTasks)
  const [currentView, setCurrentView] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [editingTask, setEditingTask] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSave = (data) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, ...data } : t))
      setEditingTask(null)
    } else {
      setTasks([{ id: Date.now(), ...data }, ...tasks])
    }
  }

  const handleDelete = (id) => setTasks(tasks.filter(t => t.id !== id))
  const handleStatus = (id, status) => setTasks(tasks.map(t => t.id === id ? { ...t, status } : t))
  const handleEdit = (task) => setEditingTask(task)

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchTab = activeTab === 'All' || t.status === activeTab
    return matchSearch && matchTab
  })

  const total = tasks.length
  const completed = tasks.filter(t => t.status === 'Completed').length
  const progress = total ? Math.round((completed / total) * 100) : 0

  return (
    <div className="app">
      <div className={sidebarOpen ? 'sidebar-wrapper open' : 'sidebar-wrapper'}>
        <Sidebar currentView={currentView} setCurrentView={(v) => { setCurrentView(v); setSidebarOpen(false) }} />
      </div>

      <main className="main">
        <div className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <input className="search-input" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
          <div className="user">S</div>
        </div>

        {currentView === 'dashboard' && (
          <>
            <div className="stats">
              <div className="stat-card"><h4>Total Tasks</h4><p>{total}</p></div>
              <div className="stat-card"><h4>Completed</h4><p>{completed}</p><div className="progress-bar"><div style={{ width: progress + '%' }}></div></div></div>
              <div className="stat-card"><h4>In Progress</h4><p>{tasks.filter(t => t.status === 'In progress').length}</p></div>
              <div className="stat-card"><h4>To Do</h4><p>{tasks.filter(t => t.status === 'To do').length}</p></div>
            </div>
            <FocusCarousel />
          </>
        )}

        {currentView === 'notes' && <FocusCarousel />}

        {(currentView === 'dashboard' || currentView === 'tasks' || currentView === 'calendar') && (
          <div className="content-grid">
            <div>
              <div className="tabs">
                {['All', 'To do', 'In progress', 'Completed'].map(tab => (
                  <button key={tab} className={activeTab === tab ? 'tab active' : 'tab'} onClick={() => setActiveTab(tab)}>{tab}</button>
                ))}
              </div>

              {filtered.length === 0 ? <div className="empty">No tasks found</div> : filtered.map(task => (
                <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatus} />
              ))}
            </div>

            <TaskForm onSave={handleSave} editingTask={editingTask} onCancel={() => setEditingTask(null)} />
          </div>
        )}
      </main>
    </div>
  )
                                                                                                  }

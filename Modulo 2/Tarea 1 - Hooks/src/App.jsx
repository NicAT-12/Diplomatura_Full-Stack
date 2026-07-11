import { useState, useMemo } from 'react';

import { useLocalStorage } from './hooks/useLocalStorage';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';

const App = () => {
  const [tasks, setTasks] = useLocalStorage("list", []);
  const [searchText, setSearchText] = useState("");

  function addTask(task) {
    if (!task.trim()) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        title: task.trim(),
        completed: false
      }
    ]);
  }

  function completeTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            completed: true
          }
          : task
      )
    )
  }

  function deleteTask(taskId) {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  }

  const filterList = useMemo(() => {
    const search = searchText.toLowerCase();

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search)
    )
  }, [tasks, searchText]);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Tarea 1 - Hooks
        </h1>

        <TaskForm addTask={addTask} />
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <TaskList
          tasks={filterList}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  )
}

export default App;
import { useEffect, useMemo, useRef, useState } from "react";
import "../node_modules/remixicon/fonts/remixicon.css";
import "./App.css";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("all");
  console.log("yes");
  const inputRef = useRef({
    taskName: "",
    dueDate: "",
  });

  // Add Task
  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      taskName: inputRef.current.taskName.value,
      dueDate: inputRef.current.dueDate.value || null,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));

    inputRef.current.taskName.value = "";
    inputRef.current.dueDate.value = "";
  };

  // Delete Task
  const deleteTask = (index) => {
    const tasksAfterDeletion = [...tasks];
    tasksAfterDeletion.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasksAfterDeletion));
    setTasks(tasksAfterDeletion);
  };

  // Complete Tasks
  const completeTask = (index) => {
    const tasksAfterCompletion = tasks.map((item, i) => {
      return i === index ? { ...item, isCompleted: true } : item;
    });
    setTasks(tasksAfterCompletion);
    localStorage.setItem("tasks", JSON.stringify(tasksAfterCompletion));
  };

  // Filter tasks
  const filterTasks = useMemo(() => {
    return (
      tasks &&
      tasks.filter((task) => {
        return status === "completed"
          ? task.isCompleted
          : status === "incomplete"
          ? !task.isCompleted
          : true;
      })
    );
  }, [status, tasks]);
  console.log(filterTasks);

  useEffect(() => {
    const tasksStorage = localStorage.getItem("tasks");
    if (tasksStorage) {
      setTasks(JSON.parse(tasksStorage));
    }
  }, []);
  return (
    <div className="tasks bg-white py-5 px-4 shadow-sm w-75 mt-5 m-auto">
      <h1 className="mb-4 text-center fw-bold">Task Tracker</h1>
      <form onSubmit={addTask} className="d-flex flex-column gap-2">
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">
            Task Name
          </label>
          <input
            type="text"
            className="form-control"
            id="taskName"
            placeholder="enter a new task"
            required
            ref={(el) => (inputRef.current.taskName = el)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            placeholder="enter a due date"
            ref={(el) => (inputRef.current.dueDate = el)}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="add-task btn btn-dark w-100">
            Add Task
          </button>
        </div>
      </form>

      <div className="filtered-Tasks mb-5 d-flex align-items-center gap-2 py-3 border-2 border-top">
        <button
          onClick={() => setStatus("all")}
          className={`btn ${status === "all" ? "bg-success" : "bg-secondary"}  text-white  fw-meduim shadow-sm `}
        >
          All Tasks
        </button>
        <button
          onClick={() => setStatus("completed")}
          className={`btn ${status === "completed" ? "bg-success" : "bg-secondary"}  text-white  fw-meduim shadow-sm`}
        >
          Completed Tasks
        </button>
        <button
          onClick={() => setStatus("incomplete")}
          className={`btn ${status === "incomplete" ? "bg-success" : "bg-secondary"}  text-white  fw-meduim shadow-sm`}
        >
          Incomplete tasks
        </button>
      </div>
      <div className="list-of-tasks">
        {filterTasks.length > 0 ? (
          filterTasks.map(({ id,taskName, dueDate, isCompleted }, index) => (
            <TaskItem
              key={id}
              taskName={taskName}
              dueDate={dueDate}
              deleteTask={() => deleteTask(index)}
              completeTask={() => completeTask(index)}
              isCompleted={isCompleted}
            />
          ))
        ) : (
          <p className="text-center fw-bold fs-3">No tasks yet! 🎉</p>
        )}
      </div>
    </div>
  );
}

export default App;

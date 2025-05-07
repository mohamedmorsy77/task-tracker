import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../node_modules/remixicon/fonts/remixicon.css";
import "./App.css";
import TaskItem from "./components/TaskItem";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MoodToggle from "./components/MoodToggle";
function App() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("all");

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
    toast.success("Task Added Successfully");
  };

  // Delete Task
  const deleteTask = useCallback(
    async (id) => {
      const result = await Swal.fire({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const tasksAfterDeletion = [...tasks].filter((task) => {
          return task.id !== id;
        });
        localStorage.setItem("tasks", JSON.stringify(tasksAfterDeletion));
        setTasks(tasksAfterDeletion);
        toast.success("Task deleted Successfully");
      }
    },
    [tasks]
  );

  // Complete Tasks
  const completeTask = useCallback(
    (id) => {
      const tasksAfterCompletion = tasks.map((task, i) => {
        return task.id === id ? { ...task, isCompleted: true } : task;
      });
      setTasks(tasksAfterCompletion);
      localStorage.setItem("tasks", JSON.stringify(tasksAfterCompletion));
      toast.success("Task Completed");
    },
    [tasks]
  );

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

  useEffect(() => {
    const tasksStorage = localStorage.getItem("tasks");
    if (tasksStorage) {
      setTasks(JSON.parse(tasksStorage));
    }
  }, []);
  return (
    <div className="tasks bg-white py-5 px-4 shadow-sm  mt-5 m-auto">
      <MoodToggle />
      <h1 className="mb-4 text-center fw-bold">Task Tracker</h1>
      <form onSubmit={addTask} className="d-flex flex-column gap-2">
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label fw-bold">
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
          <label htmlFor="dueDate" className="form-label fw-bold">
            Due Date
          </label>
          <input
            type="date"
            className="form-control "
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

      <div className="filtered-Tasks mb-5 d-flex align-items-center gap-2 flex-wrap py-3 border-2 border-top">
        <button
          onClick={() => setStatus("all")}
          className={`btn  ${
            status === "all" ? "bg-success" : "bg-secondary"
          }  text-white fw-normal   fw-lg-lighter shadow-sm `}
        >
          All Tasks
        </button>
        <button
          onClick={() => setStatus("completed")}
          className={`btn ${
            status === "completed" ? "bg-success" : "bg-secondary"
          }  text-white  fw-meduim shadow-sm`}
        >
          Completed Tasks
        </button>
        <button
          onClick={() => setStatus("incomplete")}
          className={`btn  ${
            status === "incomplete" ? "bg-success" : "bg-secondary"
          }  text-white  fw-meduim shadow-sm`}
        >
          Incomplete tasks
        </button>
      </div>
      <div className="list-of-tasks">
        {filterTasks.length > 0 ? (
          filterTasks.map(({ id, taskName, dueDate, isCompleted }) => (
            <TaskItem
              key={id}
              taskName={taskName}
              dueDate={dueDate}
              deleteTask={() => deleteTask(id)}
              completeTask={() => completeTask(id)}
              isCompleted={isCompleted}
              status={status}
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

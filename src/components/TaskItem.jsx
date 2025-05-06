import React from "react";

function TaskItem({
  taskName,
  dueDate,
  deleteTask,
  completeTask,
  isCompleted,
}) {
  return (
    <div className="task mt-3 d-flex justify-content-between align-items-center shadow-sm p-3 bg-dark text-white">
      <div className="task-info">
        <h2
          className={`task-name ${
            isCompleted ? "text-decoration-line-through" : ""
          }`}
        >
          {taskName}
        </h2>
        <p className={`${isCompleted ? "text-decoration-line-through" : ""}`}>
          Due Date: {dueDate ? dueDate : "🕒 No due date"}
        </p>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-danger fw-bold" onClick={deleteTask}>
          <i className="ri-delete-bin-6-line"></i>
        </button>
        <button className="btn btn-success fw-bold" onClick={completeTask}>
          <i className="ri-checkbox-circle-line"></i>
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

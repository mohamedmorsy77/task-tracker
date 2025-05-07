import React from "react";


function TaskItem({
  taskName,
  dueDate,
  deleteTask,
  completeTask,
  isCompleted,
  status,
}) {
    
  return (
    <div className="task row rounded-3 mt-3 d-flex  align-items-center flex-wrap shadow-sm p-3 text-white">
      <div className="col-12 col-lg-10 task-info">
        <h2
          className={`task-name text-light ${
            isCompleted ? "text-decoration-line-through" : ""
          }`}
        >
          {taskName}
        </h2>
        <p className={`due-date  fw-bold ${isCompleted ? "text-decoration-line-through" : ""}`}>
          Due Date: {dueDate ? dueDate : "🕒 No due date"}
        </p>
      </div>
      <div className="col-12 col-lg-2 d-flex align-items-center gap-2">
        <button className="btn btn-danger fw-bold flex-grow-1" onClick={deleteTask}>
          <i className="ri-delete-bin-6-line"></i>
        </button>
        {status !== "completed" ? (
          <button className="btn btn-success fw-bold flex-grow-1" onClick={completeTask}>
            <i className="ri-checkbox-circle-line"></i>
          </button>
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default React.memo(TaskItem);

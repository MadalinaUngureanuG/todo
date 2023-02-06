import { useState } from "react";
import {
  PencilFill,
  Trash3Fill,
  XCircleFill,
  Save,
} from "react-bootstrap-icons";
import { server } from "../config/index";
import taskItemStyles from "../styles/TaskItem.module.css";

export default function TaskItem(props) {
  const [ task, setTask ] = useState(props.task);
  const deleteFunction = props.deleteFunction;
  const [ editMode, setEditMode ] = useState(false);
  const [ taskName, setTaskName ] = useState("");

  async function onDelete(id) {
    if (confirm("Are you sure you want to delete this task?")) {
      const res = await fetch(`${server}/api/tasks/${id}`, {
        method: "DELETE",
      });
      deleteFunction(id);
    }
  }

  async function onUpdate(id, value) {
    let message = "";
    if (value === true) {
      message = "Are you sure you've completed this task?";
    } else {
      message = "Are you sure you want to uncheck this task?";
    }

    if (confirm(message)) {
      const res = await fetch(`${server}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: value,
        }),
      });
      let data = await res.json();
      setTask(data.data);
    }
  }

  function onClose() {
    setEditMode(false);
  }

  async function onEdit(id) {
    setEditMode(true);
    setTaskName(task.task);
  }

  const styles = {
    completedTask: {
      textDecoration: "line-through",
      color: "green",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    uncompletedTask: {
      textDecoration: "none",
      color: "white",
      textTransform: "capitalize",
    },
  };

  async function onSave(id) {
    task.task = taskName;
    const res = await fetch(`${server}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    setTask(task);
    setEditMode(false);
  }

  return [
    !editMode ? (
      <div className="flex-row d-flex">
        <input
          type="checkbox"
          checked={task.completed}
          id="flexCheckDefault"
          onChange={() => onUpdate(task._id, event.target.checked)}
        />
        <label htmlFor="flexCheckDefault" className="flex-grow-1 ms-2">
          <span
            className={taskItemStyles.child}
            style={
              task.completed ? styles.completedTask : styles.uncompletedTask
            }
          >
            {task.task}
          </span>
        </label>
        <button
          className={taskItemStyles.button}
          title="Delete"
          onClick={() => onDelete(task._id)}
        >
          <Trash3Fill className={"text-light"} />
        </button>
        <button
          className={taskItemStyles.button + " ms-2"}
          title="Edit"
          onClick={() => onEdit(task._id)}
        >
          <PencilFill className={"text-light"} />
        </button>
      </div>
    ) : (
      <div>
        <input
          type="text"
          value={taskName}
          onChange={() => {
            setTaskName(event.target.value);
          }}
        />
        <button
          className={taskItemStyles.button}
          title="Save"
          onClick={() => {
            onSave(task._id);
          }}
        >
          <Save className={"text-light"} />
        </button>
        <button
          className={taskItemStyles.button + " ms-2"}
          title="Close"
          onClick={() => onClose()}
        >
          <XCircleFill className={"text-light"} />
        </button>
      </div>
    ),
  ];
}
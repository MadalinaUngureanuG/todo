import Link from "next/link";
import { server } from "@/config/index";
import { TaskContext } from "@/contexts/TaskContext";
import addStyles from "@/styles/Add.module.css";
import taskItemStyles from "@/styles/TaskItem.module.css";
import { useContext, useState } from "react";
import {
  Calendar2DateFill,
  PencilSquare,
  PersonFill,
  Save,
  Trash3Fill,
  XCircleFill,
} from "react-bootstrap-icons";
import DatePicker from 'react-datepicker';

export default function TaskItem(props) {
  const [ task, setTask ] = useState(props.task);
  const { deleteFunction, users } = useContext(TaskContext);
  const [ editMode, setEditMode ] = useState(false);
  const [ taskName, setTaskName ] = useState("");
  const [ assignee, setAssignee ] = useState("{}");
  const [ deadline, setDeadline ] = useState(new Date());

  async function onDelete(id) {
    if (confirm("Are you sure you want to delete this task?")) {
      const res = await fetch(`${server}/api/tasks/${id}`, {
        method: "DELETE",
      });
      deleteFunction(id);
    }
  }

  async function markAsCompleted(id, value) {
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
    setAssignee(JSON.stringify(task.assignee));
    setDeadline(task.deadline);
  }

  const styles = {
    completedTask: {
      textDecoration: "line-through",
      color: "green",
      fontWeight: "bold",
    },
    uncompletedTask: {
      textDecoration: "none",
      color: "white",
    },
  };

  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1):""
  }

  async function onSave(id) {
    task.task = taskName;
    task.assignee = JSON.parse(assignee);
    task.deadline = deadline;
    const res = await fetch(`${server}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    
    setTask(task);
    setEditMode(false);
    alert(`Change saved successfully!`);
  }

  function onDateSelect(date) {
    setDeadline(getFormatDate(date));
  }

  function getFormatDate(formatDate) {
    return `${formatDate.getFullYear()}-${String(
      formatDate.getMonth() + 1
    ).padStart(2, "0")}-${String(formatDate.getDate()).padStart(2, "0")}`;
  }

  return [
    !editMode ? (
      <div className="flex-row d-flex align-items-center">
        <input
          type="checkbox"
          checked={task.completed}
          id="flexCheckDefault"
          onChange={() => markAsCompleted(task._id, event.target.checked)}
        />
        <label
          htmlFor="flexCheckDefault"
          className="flex flex-grow-1 mx-2"
        >
          <span
            className="child"
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
          <Trash3Fill className="text-light" />
        </button>
        <button
          className={taskItemStyles.button + " ms-2"}
          title="Edit"
          onClick={() => onEdit(task._id)}
        >
          <PencilSquare className="text-light" />
        </button>
        <Link 
          legacyBehavior
          href="/user-details/[_id]" 
          as={`/user-details/${task.assignee._id}`}
        >
        <button
          className={taskItemStyles.button + " ms-2"}
          title={"Assigned to: " + capitalizeFirstLetter(task?.assignee?.firstName) + " " + capitalizeFirstLetter(task?.assignee?.lastName)}
        >
          <PersonFill className="text-light" />
        </button>
        </Link>
        <button
          className={taskItemStyles.button + " ms-2"}
          title={"Deadline: " + task.deadline}
          style={{ cursor: "default" }}
        >
          <Calendar2DateFill className="text-light" />
        </button>
      </div>
    ) : (
      <div>
        <div className="d-flex align-items-center">
         <input
          type="text"
          value={taskName}
          onChange={() => {
            setTaskName(event.target.value);
          }}
          className="flex-fill"
         />
         <button
          className={taskItemStyles.button + " ms-2"}
          title="Save"
          onClick={() => {
            onSave(task._id);
          }}
         >
          <Save className="text-light" />
         </button>
         <button
          className={taskItemStyles.button + " ms-2"}
          title="Close"
          onClick={() => onClose()}
         >
          <XCircleFill className="text-light" />
         </button>
        </div>
        <div className="d-flex flex-column mt-2">
          <select value={assignee} className="mx-0 text-capitalize py-1" aria-label="Users select" onChange={event => setAssignee(event.target.value)}>
            <option value={"{}"}>Select another user...</option>
             {users && users.map((user) => {
               return <option value={JSON.stringify(user)} key={user._id}>Assigned to: {user.firstName} {user.lastName}</option>
             })}
          </select>
        </div>
        <div className="d-flex flex-column mt-2">
        <DatePicker 
        className={addStyles.date}
        value={deadline}
        onChange={date => onDateSelect(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
        showYearDropdown
        scrollableYearDropdown 
        />
        </div>
      </div>
    ),
  ];
}
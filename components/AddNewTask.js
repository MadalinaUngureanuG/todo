import { useState } from "react";
import newTaskStyles from "../styles/AddNewTask.module.css";
import { server } from "./../config/index";

export default function AddNewTask(props) {
  const addTask = props.data;
  const [ newTask, setNewTask ] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    const res = await fetch(`${server}/api/tasks`, {
      method: "POST",
      body: JSON.stringify({
        task: newTask,
        completed: false,
      }),
    });
    const addedTask = await res.json();
    setNewTask("");
    addTask(addedTask.data);
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="mb-5">
        <div className={"flex-row d-flex"}>
          <input
            className={newTaskStyles.input + " flex-fill"}
            type="text"
            value={newTask}
            onChange={event => setNewTask(event.target.value)}
          />
          <button className={newTaskStyles.button} type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

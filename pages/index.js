import AddNewTask from "../components/AddNewTask";
import TaskList from "../components/TaskList";
import { server } from "@/config";
import { useEffect, useState } from "react";
import homeStyles from "../styles/Home.module.css";

export default function Home() {
  const [ tasks, setTasks ] = useState([]);

  function addTask(task) {
    setTasks([ ...tasks, task ]);
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${server}/api/tasks`);
      const tasks = await res.json();
      setTasks(tasks.data);
    }
    fetchData();
  }, []);

  function deleteTask(taskId) {
    const position = tasks.findIndex(d => d._id == taskId);
    tasks.splice(position, 1);
    setTasks([ ...tasks ]);
  }

  return (
    <div className={homeStyles.width}>
      <AddNewTask data={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

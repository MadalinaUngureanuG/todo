import AddNewTask from "@/components/tasks/AddNewTask";
import TaskList from "@/components/tasks/TaskList";
import addBtnStyles from "@/styles/Add.module.css";
import { server } from "@/config";
import { TaskContext } from "@/contexts/TaskContext";
import { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ListTask, Search } from "react-bootstrap-icons";

export default function Home() {
  const [ tasks, setTasks ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const inputRef = useRef(null);

  function onAdd(task) {
    tasks.unshift(task);
    setTasks([ ...tasks ]);
    setShowForm(false);
  }

  function onDelete(taskId) {
    const startPosition = tasks.findIndex(d => d._id == taskId);
    if (startPosition > -1) {
      tasks.splice(startPosition, 1);
      setTasks([ ...tasks ]);
    }
  }

  function add() {
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`${server}/api/users`);
      let users = await res.json();
      users.data.forEach(user=>{
        delete user.tasksCount
      })
      setUsers(users.data);
    }
    fetchData();
    fetchUsers();
  }, []);

  async function fetchData(searchText=null) {
    let url = `${server}/api/tasks`;
    if(searchText){
      url+="?search="+searchText;
    }
    const res = await fetch(url);
    const tasks = await res.json();
    setTasks(tasks.data);
  }

  function search() {
    const searchData = inputRef.current.value;
    fetchData(searchData);
  }

  function handleKeyPress(event)  {
    if(event.key === "Enter"){
      search();
    }
  }

  return (
    <div className="width">
      <TaskContext.Provider value={{
        deleteFunction: onDelete, 
        addFunction: onAdd, 
        users: users, }}>
      <InputGroup className="mb-5" id="search" autoComplete="off" onKeyDown={handleKeyPress}>
        <Form.Control
          placeholder="Search for a task..."
          aria-label="Search for a task..."
          aria-describedby="basic-addon2"
          ref={inputRef}
          id="form"
        />
          <Button className="icon fs-5" type="submit" onClick={() => search()}>
            <Search />
          </Button>
      </InputGroup>
          {!showForm && (
            <div className="d-flex flex-row-reverse mb-3">
              <Button className={addBtnStyles.button} onClick={() => add()}>
                <ListTask className="text-light me-1" />
                Add a new task
              </Button>
            </div>
          )}
          {showForm && <AddNewTask onClose={closeForm}/>}
        {tasks && tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </TaskContext.Provider>
    </div>
  );
}

import { server } from "@/config/index";
import { TaskContext } from "@/contexts/TaskContext";
import addStyles from "@/styles/Add.module.css";
import { useContext, useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddNewTask(props) {
  const { addFunction, users } = useContext(TaskContext);
  const [ newTask, setNewTask ] = useState("");
  const [ assignee, setAssignee ] = useState("{}");
  const [ deadline, setDeadline ] = useState(new Date());

  async function submitHandler(event) {
    event.preventDefault();

    const res = await fetch(`${server}/api/tasks`, {
      method: "POST",
      body: JSON.stringify({
        task: newTask,
        completed: false,
        assignee: JSON.parse(assignee),
        deadline: deadline.toISOString().slice(0, 10),
      }),
    });

    const responseData = await res.json();
    const addedTask = responseData.data;
    addFunction(addedTask);
    setNewTask("");
    setAssignee("{}");
    alert(responseData.message);
  }
 
  function closeForm() {
     props.onClose();
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="mb-5">
        <div className="d-flex flex-row">
          <input
            required
            className={addStyles.input + " flex-fill"}
            type="text"
            value={newTask}
            onChange={event => setNewTask(event.target.value)}
          />
        </div>
        <div className="d-flex flex-column mt-2">
          <select
            required
            value={assignee}
            className={addStyles.input + " mx-0 text-capitalize"}
            aria-label="Users select"
            onChange={event => setAssignee(event.target.value)}
          >
            <option value={"{}"}>Please select one user...</option>
            {users &&
              users.map((user) => {
                return (
                  <option value={JSON.stringify(user)} key={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="d-flex flex-column mt-3">
          <div>
            <label className="text-light">Select a deadline for your task...</label>
          </div>
        <DatePicker 
        className={addStyles.date}
        selected={deadline}
        onChange={date => setDeadline(date)}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
        showYearDropdown
        scrollableYearDropdown 
        />
      </div>
      <div className="d-flex flex-row-reverse mt-4">
          <button className={addStyles.button + " ms-1"} type="submit">
            Save
          </button>
          <button className={addStyles.button} type="button" onClick={closeForm}>
            Close
          </button>
      </div> 
    </form>
    </div>
  );
}

import TaskList from "@/components/tasks/TaskList";
import { server } from "@/config/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EnvelopeAt, Telephone } from "react-bootstrap-icons";

export default function UserDetails() {
  const [ user, setUser ] = useState([]);
  const [ completedTasks, setCompletedTasks ] = useState([]);
  const [ expiredTasks, setExpiredTasks ] = useState([]);
  const [ tasksInProgress, setTasksInProgress] = useState([]);
  const { id } = useRouter().query;

  useEffect(
    () => {
      async function fetchUser() {
        const res = await fetch(`${server}/api/users/${id}`);
        const user = await res.json();
        setUser(user.data);
      }
      async function fetchCompletedTasks() {
        const res = await fetch(`${server}/api/completed-tasks/${id}`);
        const completed = await res.json();
        setCompletedTasks(completed.data);
      }
      async function fetchExpiredTasks() {
        const res = await fetch(`${server}/api/expired-tasks/${id}`);
        const expired = await res.json();
        setExpiredTasks(expired.data);
      }
      async function fetchTasksInProgress() {
        const res = await fetch(`${server}/api/tasks-in-progress/${id}`);
        const progress = await res.json();
        setTasksInProgress(progress.data);
      }
      if (id) {
        fetchUser();
        fetchCompletedTasks();
        fetchExpiredTasks();
        fetchTasksInProgress();
      }
    },
    [ id ]
  );

  return (
    <div className="width">
      {user ? (
        <div className="mb-5">
          <h1 className="text-capitalize fw-bold text-center mb-3">
            {user.firstName} {user.lastName}
          </h1>
          <div className="d-flex">
            <p className="flex-grow-1">
              <EnvelopeAt className="me-1" />
              {user.email}
            </p>
            <p>
              <Telephone className="me-1" />
              {user.phone}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {completedTasks.length > 0 ? (
        <div className="mb-5">
          <h1>Completed tasks:</h1>
          <TaskList tasks={completedTasks} />
        </div>
      ) : (
        <p>No completed tasks were found for this user.</p>
      )}
      {expiredTasks.length > 0 ? (
        <div className="mb-5">
          <h1>Expired tasks:</h1>
          <TaskList tasks={expiredTasks} />
        </div>
      ) : (
        <p>No expired tasks were found for this user.</p>
      )}
      {tasksInProgress.length > 0 ? (
        <div className="mb-5">
        <h1>Tasks in progress:</h1>
        <TaskList tasks={tasksInProgress} />
      </div>
      ) : (
        <p>No tasks in progress were found for this user.</p>
      )}
    </div>
  );
}

import TaskItem from "./TaskItem";
import { ListGroup } from "react-bootstrap";
import taskItemStyles from "../styles/TaskItem.module.css";

export default function TaskList(props) {
  const tasks = props.tasks;

  function deleteTask(taskId) {
    props.deleteTask(taskId);
  }

  return (
    <div>
      <ul className={taskItemStyles.width + " m-0 p-0"}>
        {tasks.map(task => {
          return (
            <ListGroup
              variant="flush"
              key={task._id}
              className={taskItemStyles.item + " flex-grow-1"}
            >
              <ListGroup.Item className={taskItemStyles.color}>
                <TaskItem task={task} deleteFunction={deleteTask} />
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </ul>
    </div>
  );
}

import TaskItem from "./TaskItem";
import taskItemStyles from "@/styles/TaskItem.module.css";
import { ListGroup } from "react-bootstrap";

export default function TaskList(props) {
  const tasks = props.tasks;

  return (
    <div>
      <ul className={taskItemStyles.width + " m-0 p-0"}>
        {tasks.map(task => {
          return (
            <ListGroup key={task._id}
              variant="flush"
              className={taskItemStyles.item + " flex-grow-1"}
            >
              <ListGroup.Item className={taskItemStyles.color}>
                <TaskItem task={task} />
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </ul>
    </div>
  );
}

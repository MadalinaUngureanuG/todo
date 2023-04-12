import { Badge, Button, ListGroup } from "react-bootstrap";
import {
  PencilSquare,
  Trash3Fill,
  Telephone,
  EnvelopeAt,
  ForwardFill,
} from "react-bootstrap-icons";
import { server } from "../../config/index";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import userItemStyles from "@/styles/users/UserItem.module.css";
import Link from "next/link";

export default function UserItem(props) {
  const user = props.user;
  const { deleteFunction, editFunction } = useContext(UserContext);

  async function onDelete(id) {
    if (confirm("Do you want to delete this user?")) {
      const res = await fetch(`${server}/api/users/${id}`, {
        method: "DELETE",
      });
      deleteFunction(id);
    }
  }

  function onEdit() {
    editFunction(user);
  }

  return (
    <div>
      <ListGroup className={userItemStyles.item}>
        <ListGroup.Item
          as="li"
          className={
            userItemStyles.color +
            " d-flex justify-content-between align-items-start"
          }
        >
          <div
            className="child d-flex text-white ms-2 me-auto"
          >
            <span className="me-2">{props.index + 1}. </span>
            <div className="d-flex flex-column">
              <div className="d-flex">
              <h4 className="flex text-capitalize me-1">
                {user.firstName} {user.lastName}
              </h4>
              <Badge
                  pill
                  title={
                  user.tasksCount +
                  " " +
                  "tasks allocated to " +
                  user.firstName +
                  " " +
                  user.lastName
                  }
                  className={userItemStyles.badge}
              >
                  {user.tasksCount}
              </Badge>
              </div>
              <p className="ms-4">
                <EnvelopeAt />
                <ForwardFill />
                {user.email}
              </p>
              <p className="ms-4">
                <Telephone />
                <ForwardFill />
                {user.phone}
              </p>
            </div>
          </div>
          <Button
            className={userItemStyles.button + " ms-2"}
            onClick={() => onEdit()}
          >
            <PencilSquare className={userItemStyles.size + " text-light"} />
          </Button>
          <Button
            className={userItemStyles.button + " ms-1"}
            onClick={() => onDelete(user._id)}
          >
            <Trash3Fill className={userItemStyles.size + " text-light"} />
          </Button>
          <Link
            legacyBehavior
            href="/user-details/[_id]"
            as={`/user-details/${user._id}`}
          >
            <Button className={userItemStyles.button + " ms-1"}>
              View More
            </Button>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

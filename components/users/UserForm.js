import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import addBtnStyles from "../../styles/Add.module.css";
import { server } from "./../../config/index";
import { UserContext } from "./../../contexts/UserContext";

export default function UserForm(props) {
  const user = props.user;
  const { addFunction, onEdit } = useContext(UserContext);
  const [ firstName, setFirstName ] = useState(user.firstName || "");
  const [ lastName, setLastName ] = useState(user.lastName || "");
  const [ phone, setPhone ] = useState(user.phone || "");
  const [ email, setEmail ] = useState(user.email || "");

  async function submitHandler(event) {
    event.preventDefault();

    if (user._id) {
      const res = await fetch(`${server}/api/users/${user._id}`, {
        method: "PUT",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
        }),
      });

      const responseData = await res.json();
      const updatedUser = responseData.data;
      onEdit(updatedUser);
      alert(responseData.message);
    } else {
      const res = await fetch(`${server}/api/users/`, {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
        }),
      });

      const responseData = await res.json();
      const addedUser = responseData.data;
      addFunction(addedUser);
      alert(responseData.message);
    }
  }

  function closeForm() {
    props.onClose();
  }

  return (
    <div>
      <Form onSubmit={submitHandler} className="mb-5">
        <Form.Group
          required
          as={Row}
          className="mb-3"
          controlId="formPlaintextPassword"
        >
          <Form.Label column sm="2">
            Last Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              className={addBtnStyles.input + " text-capitalize"}
              type="text"
              maxLength={15}
              value={lastName}
              onChange={event => setLastName(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            First Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              className={addBtnStyles.input + " text-capitalize"}
              type="text"
              maxLength={15}
              value={firstName}
              onChange={event => setFirstName(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              className={addBtnStyles.input}
              type="email"
              maxLength={20}
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Phone
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              className={addBtnStyles.input}
              type="text"
              value={phone}
              onChange={event => setPhone(event.target.value)}
            />
          </Col>
        </Form.Group>
        <div className="d-flex flex-row-reverse">
          <Button className={addBtnStyles.button + " ms-1"} type="submit">
            Save
          </Button>
          <Button
            className={addBtnStyles.button}
            type="button"
            onClick={closeForm}
          >
            Close
          </Button>
        </div>
      </Form>
    </div>
  );
}

import UserForm from "@/components/users/UserForm";
import UserList from "@/components/users/UserList";
import addBtnStyles from "@/styles/Add.module.css";
import { server } from "@/config";
import { UserContext } from "@/contexts/UserContext";
import { useEffect, useState, useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { PersonFillAdd, Search } from "react-bootstrap-icons";

export default function Users() {
  const [ users, setUsers ] = useState([]);
  const [ showForm, setShowForm ] = useState(false);
  const [ selectedUser, setSelectedUser ] = useState({});
  const inputRef = useRef(null);

  function onEdit(user) {
    setShowForm(true);
    setSelectedUser({ ...user });
  }

  function onDelete(userId) {
    const startPosition = users.findIndex(user => user._id === userId);
    if (startPosition > -1) {
      users.splice(startPosition, 1);
      setUsers([ ...users ]);
    }
  }

  function onAdd(user) {
    users.unshift(user);
    setUsers([ ...users ]);
    setShowForm(false);
  }

  function afterEdit(user) {
    const position = users.findIndex(item => item._id === user._id);
    users[position] = user;
    setUsers([ ...users ]);
    setShowForm(false);
  }

  function add() {
    setSelectedUser({});
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(searchText=null) {
    let url = `${server}/api/users`;
    if(searchText) {
      url+="?search="+searchText;
    }
    const res = await fetch(url);
    const users = await res.json();
    setUsers(users.data);
  }

  function search() {
    const searchData = inputRef.current.value;
    fetchData(searchData);
  }

  function handleKeyPress(event) {
    if(event.key === "Enter") {
      search();
    }
  }

  return (
    <div className="width">
      <UserContext.Provider
        value={{
          deleteFunction: onDelete,
          addFunction: onAdd,
          onEdit: afterEdit,
          editFunction: onEdit,
        }}
      >
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
              <PersonFillAdd className="text-light me-1" />
              Add a new user
            </Button>
          </div>
        )}
        {showForm && <UserForm user={selectedUser} onClose={closeForm} />}
        {users && users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <UserList users={users} />
        ) }
      </UserContext.Provider>
    </div>
  );
}

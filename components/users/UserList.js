import UserItem from "./UserItem";

export default function UserList(props) {
  const users = props.users;

  return (
    <ul className="p-0">
      {users.map((user, index) => {
        return <UserItem key={user._id} user={user} index={index} />;
      })}
    </ul>
  );
}

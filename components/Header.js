import headerStyles from "../styles/Header.module.css";

export default function Header() {
  return (
    <div>
      <h1 className={headerStyles.title + " text-center text-light"}>To Do App</h1>
    </div>
  );
}

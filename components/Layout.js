import styles from "../styles/Layout.module.css";
import Header from "./Header";
import { Container } from "react-bootstrap";
import Meta from "./Meta";

const Layout = ({ children }) => {
  return (
    <>
    <Meta />
    <Container className={styles.container + " g-0"} fluid>
      <main className={styles.main}>
        <Header />
        {children}
      </main>
    </Container>
    </>
  );
};

export default Layout;

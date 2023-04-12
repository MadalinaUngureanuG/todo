import styles from "../styles/Layout.module.css";
import Header from "./Header";
import ScrollToUpButton from "./ScrollToUpButton";
import { Container, Button } from "react-bootstrap";
import Meta from "./Meta";
import TopNavbar from "./TopNavbar";

const Layout = ({ children }) => {
  return (
    <>
    <Meta />
    <Container className={styles.container + " g-0"} fluid>
      <main className={styles.main}>
        <Header />
        <TopNavbar />
        {children}
      </main>
      <ScrollToUpButton />
    </Container>
    </>
  );
};

export default Layout;

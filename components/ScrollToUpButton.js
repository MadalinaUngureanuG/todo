import { Button } from "react-bootstrap";
import styles from "@/styles/Layout.module.css";
import { ArrowBarUp } from "react-bootstrap-icons";


export default function ScrollToUpButton () {
    function scrollToTop(){
        window.scrollTo({top:0})
    }

    return (
        <div>  
            <Button className={styles.scroll} onClick={()=>scrollToTop()}>
              <ArrowBarUp  className="fs-4"/>
            </Button>
        </div>
    )
}
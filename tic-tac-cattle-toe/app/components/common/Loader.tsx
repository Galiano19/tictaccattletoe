import { AiOutlineLoading } from "react-icons/ai";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <AiOutlineLoading />
    </div>
  );
}

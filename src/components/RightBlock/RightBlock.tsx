import styles from "./rightblock.module.css";
import { TimeTask } from "../TimeTask";

export function RightBlock() {
  return (
    <div className={styles.rightBlock}>
      <TimeTask />
    </div>
  );
}

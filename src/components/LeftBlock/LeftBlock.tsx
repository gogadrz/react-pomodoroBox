import styles from "./leftblock.module.css";
import { MainInfo } from "../MainInfo";
import { AddTask } from "../AddTask";
import { ShowTasks } from "../ShowTasks";

export function LeftBlock() {
  return (
    <div className={styles.leftBlock}>
      <MainInfo />
      <AddTask />
      <ShowTasks />
    </div>
  );
}

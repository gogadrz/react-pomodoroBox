import ReactDOM from "react-dom";
import styles from "./deleteconfirm.module.css";
import { useDispatch } from "react-redux";
import { fixRests, removePomodoro } from "../../store/pomodoroSlice";

interface IDeleteConfirm {
  taskId: string;
}

export function DeleteConfirm({ taskId }: IDeleteConfirm) {
  const dispatch = useDispatch();

  console.log("confirm dialog");
  const node = document.querySelector("#modal");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className={styles.background}>
      <div className={styles.deleteDialog}>
        <h2 className={styles.title}>Удалить задачу?</h2>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            dispatch(removePomodoro(taskId));
            dispatch(fixRests());
          }}
        >
          удалить
        </button>

        <button className={styles.cancelBtn} onClick={(e) => {}}>
          отмена
        </button>
      </div>
    </div>,
    node
  );
}

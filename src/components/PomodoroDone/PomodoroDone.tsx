import styles from "./pomodorodone.module.css";
import ReactDOM from "react-dom";

interface IPomodoroDone {
  text: string;
}

export function PomodoroDone({ text }: IPomodoroDone) {
  const node = document.querySelector("#modal");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className={styles.background}>
      <div className={styles.doneDialog}>
        <h2 className={styles.title}>{text}</h2>
      </div>
    </div>,
    node
  );
}

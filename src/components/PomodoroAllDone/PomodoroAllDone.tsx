import { styled } from "styled-components";
import styles from "./pomodoroalldone.module.css";
import ReactDOM from "react-dom";

interface IPomodoroAllDone {
  show: (flag: boolean) => void;
}

export function PomodoroAllDone({ show }: IPomodoroAllDone) {
  const node = document.querySelector("#modal");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div
      onClick={() => {
        console.log("click");
        show(false);
      }}
      className={styles.background}
    >
      <div className={styles.doneDialog}>
        <h2 className={styles.title}>Задач нет</h2>
        <StyledOk>Ok</StyledOk>
      </div>
    </div>,
    node
  );
}

const StyledOk = styled.button`
  display: flex;
  align-self: center;

  padding: 10px 30px;
  margin-bottom: 20px;

  background-color: transparent;
  border-color: #a8b64f;
  color: #a8b64f;

  transition: border-color 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    border-color: #899441;
    color: #899441;
  }
`;

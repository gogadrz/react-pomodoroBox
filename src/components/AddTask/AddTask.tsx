import { useState } from "react";
import styles from "./addtask.module.css";
import { addPomodoro, fixRests } from "../../store/pomodoroSlice";
import { useDispatch, useSelector } from "react-redux";
import { TaskType } from "../../models/IPomodoro";
import { RootState } from "../../store";
import { ThemeEnum } from "../../models/ITheme";
import styled from "styled-components";
import cursor from "../../cursor/cursor.png";
import cursorInvert from "../../cursor/cursor-invert.png";

export function AddTask() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const pomodoros = useSelector(
    (state: RootState) => state.pomodoros.pomodoros
  );

  return (
    <form className={styles.addTaskForm}>
      <input
        className={styles.addTaskInput}
        type="text"
        placeholder="Название задачи"
        value={text}
        onChange={(ev) => {
          setText(ev.currentTarget.value);
        }}
      />
      <StyledButton
        className={
          pomodoros.theme === ThemeEnum.light ? "cursorLight" : "cursorDark"
        }
        disabled={!text}
        onClick={(event) => {
          event.preventDefault();
          dispatch(
            addPomodoro({
              text: text[0].toUpperCase() + text.slice(1),
              task: TaskType.PomodoroTask,
              curTheme:
                pomodoros.theme === ThemeEnum.light
                  ? ThemeEnum.light
                  : ThemeEnum.dark,
            })
          );

          dispatch(fixRests());
          setText("");
        }}
      >
        Добавить
      </StyledButton>
    </form>
  );
}

const StyledButton = styled.button`
  padding: 20px 58px;
  color: #fff;
  background-color: rgba(168, 182, 79, 1);
  border: none;
  &.cursorLight {
    cursor: url(${cursor}), pointer;
  }
  &.cursorDark {
    cursor: url(${cursorInvert}), pointer;
  }
  &:disabled {
    cursor: default;
    color: #999;
    background-color: rgba(168, 182, 79, 0.3);
  }
`;

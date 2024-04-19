import { useDispatch, useSelector } from "react-redux";
import styles from "./taskcontrols.module.css";
import { RootState } from "../../store";
import { TaskStatus } from "../../models/IPomodoro";
import {
  setDonePomodoro,
  setTaskStatus,
  toggleTaskStatus,
} from "../../store/pomodoroSlice";
import styled from "styled-components";
import cursor from "../../cursor/cursor.png";
import cursorInvert from "../../cursor/cursor-invert.png";
import { ThemeEnum } from "../../models/ITheme";

interface ITaskControls {
  resetTimerFunc: (stop: boolean) => void;
  done: (done: boolean) => void;
}

export function TaskControls({ done, resetTimerFunc }: ITaskControls) {
  const pomodoros = useSelector(
    (state: RootState) => state.pomodoros.pomodoros
  );

  const dispatch = useDispatch();

  const startBtnTitle =
    pomodoros.status === TaskStatus.Idle
      ? "Старт"
      : pomodoros.status === TaskStatus.Running
      ? "Пауза"
      : "Продолжить";

  const stopBtnTitle =
    pomodoros.status === TaskStatus.Paused ? "Сделано" : "Стоп";

  return (
    <div className={styles.taskControls}>
      <StyledButtonStart
        className={
          pomodoros.theme === ThemeEnum.light ? "cursorLight" : "cursorDark"
        }
        disabled={pomodoros.allDone}
        onClick={() => {
          dispatch(toggleTaskStatus());
          done(false);
        }}
      >
        {startBtnTitle}
      </StyledButtonStart>
      <StyledButtonStop
        className={
          pomodoros.theme === ThemeEnum.light ? "cursorLight" : "cursorDark"
        }
        disabled={pomodoros.status === TaskStatus.Idle ? true : false}
        onClick={() => {
          if (pomodoros.status === TaskStatus.Running) {
            dispatch(setTaskStatus(TaskStatus.Idle));
            resetTimerFunc(true);
            done(false);
          } else if (pomodoros.status === TaskStatus.Paused) {
            dispatch(setTaskStatus(TaskStatus.Idle));
            dispatch(setDonePomodoro(pomodoros.currentPomodoroId));
            done(false);
            // dispatch(toNextPomodoro());
          }
        }}
      >
        {stopBtnTitle}
      </StyledButtonStop>
    </div>
  );
}

const StyledButtonStart = styled.button`
  padding: 15px 50px;
  color: #fff;
  background-color: #a8b64f;
  margin-right: 25px;
  border: none;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: #899441;
  }
  &.cursorLight {
    cursor: url(${cursor}), pointer;
  }
  &.cursorDark {
    cursor: url(${cursorInvert}), pointer;
  }
  &:disabled {
    color: #c4c4c4;
    background-color: transparent;
    cursor: default;
    border: 1px solid #c4c4c4;
  }
`;

const StyledButtonStop = styled.button`
  color: #c4c4c4;
  border: 2px solid #dc3e22;
  background-color: transparent;
  padding: 14px 50px;
  border: 1px solid #c4c4c4;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: var(--stop-btn-active-color);
  }
  &.cursorLight {
    cursor: url(${cursor}), pointer;
  }
  &.cursorDark {
    cursor: url(${cursorInvert}), pointer;
  }
  &:disabled {
    background-color: transparent;
    cursor: default;
  }
`;

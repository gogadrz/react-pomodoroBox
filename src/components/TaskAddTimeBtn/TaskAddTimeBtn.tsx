import styled from "styled-components";
import cursor from "../../cursor/cursor.png";
import cursorInvert from "../../cursor/cursor-invert.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThemeEnum } from "../../models/ITheme";
import { fixRests, incrementPomodoro } from "../../store/pomodoroSlice";

export function TaskAddTimeBtn() {
  const pomodoros = useSelector(
    (state: RootState) => state.pomodoros.pomodoros
  );
  const dispatch = useDispatch();

  return (
    <StyledTaskAddBtn
      onClick={() => {
        dispatch(incrementPomodoro(pomodoros.currentPomodoroId));
        dispatch(fixRests());
      }}
      className={
        pomodoros.theme === ThemeEnum.light ? "cursorLight" : "cursorDark"
      }
      disabled={pomodoros.allDone}
    >
      <svg
        className="taskAddTimeIcon"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="25" r="25" fill="currentcolor" />
        <path
          d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z"
          fill="white"
        />
      </svg>
    </StyledTaskAddBtn>
  );
}

const StyledTaskAddBtn = styled.button`
  border-radius: 50%;
  border: none;
  background-color: transparent;
  transition: color 0.3s ease-in-out;
  color: #c4c4c4;
  &:hover {
    color: #899441;
  }
  &:active {
    transform: translate(2px, 2px);
  }
  &.cursorLight {
    cursor: url(${cursor}), pointer;
  }
  &.cursorDark {
    cursor: url(${cursorInvert}), pointer;
  }
  &:disabled {
    color: #c4c4c4;
    cursor: default;
    transform: translate(0, 0);
  }
`;

import { useSelector } from "react-redux";
import styles from "./pomodoroscounter.module.css";
import { RootState } from "../../store";
import { ThemeEnum } from "../../models/ITheme";
import { darkTheme, lightTheme } from "../../styles/theme";

interface IPomodorosCounter {
  counter: number;
}

export function PomodorosCounter({ counter }: IPomodorosCounter) {
  const theme = useSelector(
    (state: RootState) => state.pomodoros.pomodoros.theme
  );

  return (
    <div className={styles.mainLayer}>
      <div className={styles.pomodoroCounter}>{counter}</div>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12.5"
          cy="12.5"
          r="12"
          stroke={
            theme === ThemeEnum.light
              ? `${lightTheme.colors.mutted}`
              : `${darkTheme.colors.mutted}`
          }
        />
      </svg>
    </div>
  );
}

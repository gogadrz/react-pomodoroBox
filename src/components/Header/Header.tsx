import styles from "./header.module.css";
import { PomodoroIcon } from "../PomodoroIcon";
import { StatisticIcon } from "../StatisticIcon";
import { Link } from "react-router-dom";
import themeIcon from "./theme.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setTheme } from "../../store/pomodoroSlice";
import { ThemeEnum } from "../../models/ITheme";
import { styled } from "styled-components";
import cursor from "../../cursor/cursor.png";
import cursorInvert from "../../cursor/cursor-invert.png";

export function Header() {
  const dispatch = useDispatch();

  const currentTheme = useSelector(
    (state: RootState) => state.pomodoros.pomodoros
  );

  return (
    <StyledHeader>
      <StyledLogo
        className={
          currentTheme.theme === ThemeEnum.light ? "cursorLight" : "cursorDark"
        }
      >
        <Link to="/timer" className={styles.pomodoroLink}>
          <PomodoroIcon />
          pomodoro_box
        </Link>
      </StyledLogo>
      <StyledButton
        className={
          currentTheme.theme === ThemeEnum.light ? "cursorLight" : "cursorDark"
        }
        onClick={() => {
          dispatch(
            setTheme(
              // ThemeEnum.dark
              currentTheme.theme === ThemeEnum.light
                ? ThemeEnum.dark
                : ThemeEnum.light
            )
          );
        }}
      >
        <img src={themeIcon} width={40} height={40} alt="Сменить тему" />
      </StyledButton>
      <StyledStatistic
        className={
          currentTheme.theme === ThemeEnum.light ? "cursorLight" : "cursorDark"
        }
      >
        <Link to="/statistics" className={styles.statisticLink}>
          <StatisticIcon />
          Статистика
        </Link>
      </StyledStatistic>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 5.5%;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
  background-color: ${({ theme }) => theme.bgColors.primary};
  transition: background-color 1s ease-in-out;
`;

const StyledButton = styled.button`
  color: blue;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  margin-left: auto;
  margin-right: 30px;
  transition: transform 1s ease-in-out;
  &:hover {
    color: green;
  }
  &.cursorLight {
    cursor: url(${cursor}), pointer;
  }
  &.cursorDark {
    cursor: url(${cursorInvert}), pointer;
    transform: rotateZ(180deg);
  }
`;

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  &.cursorLight {
    cursor: url(${cursor}), pointer;
  }
  &.cursorDark {
    cursor: url(${cursorInvert}), pointer;
  }
`;

const StyledStatistic = styled.div`
  display: flex;
  &:hover {
    color: #b7280f;
  }
  &.cursorLight {
    cursor: url(${cursor}), pointer;
  }
  &.cursorDark {
    cursor: url(${cursorInvert}), pointer;
  }
`;

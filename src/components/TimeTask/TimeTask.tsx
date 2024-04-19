import styles from "./timetask.module.css";
import { TaskContent } from "../TaskContent";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { TaskStatus, TaskType } from "../../models/IPomodoro";
import { styled } from "styled-components";
import { getPomodoroById } from "../../store/pomodoroSlice";

export function TimeTask() {
  const pomodoros = useSelector(
    (state: RootState) => state.pomodoros.pomodoros
  );

  const curPomodoro = getPomodoroById(pomodoros, pomodoros.currentPomodoroId);

  if (pomodoros.totalPomodoros === 0 || curPomodoro === null) {
    return (
      <EmptyBlock>
        <h2 className={styles.title}>Здесь пока пусто</h2>
        <p className={styles.descr}>Добавьте первый помидор</p>
      </EmptyBlock>
    );
  } else {
    return (
      <div className={styles.showTask}>
        <StyledTaskHeader
          className={
            pomodoros.status === TaskStatus.Running ? "running" : "paused"
          }
        >
          {" "}
          {pomodoros.allDone ? (
            "Все задачи выполнены"
          ) : (
            <div className={styles.taskName}>{curPomodoro.text}</div>
          )}
          <div className={styles.pomodoroNumber}>
            {curPomodoro.taskType === TaskType.PomodoroTask && (
              <span>{curPomodoro.pomodoroCntText}</span>
            )}
          </div>
        </StyledTaskHeader>
        <TaskContent />
      </div>
    );
  }
}

const EmptyBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.bgColors.secondary};
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};

  padding: 100px 0 130px 0;
  transition: color 1s ease-in-out, background-color 1s ease-in-out;
`;

const StyledTaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #c4c4c4;
  padding: 20px 40px;
  transition: background-color 0.5s ease-in-out;
  &.running {
    background-color: #dc3e22;
  }
  .paused {
    background-color: #a8b64f;
  }
`;

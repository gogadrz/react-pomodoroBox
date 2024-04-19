import styles from "./taskdescription.module.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TaskType } from "../../models/IPomodoro";

export function TaskDescription() {
  const task = useSelector((state: RootState) => state.pomodoros.pomodoros);
  const currentTask = task.tasksWithRests[task.currentPomodoroIndex];

  const descr = () => {
    if (currentTask === undefined) {
      return "current task undefined";
    }
    if (currentTask.taskType === TaskType.PomodoroTask) {
      return currentTask.pomodoroCnt > 1
        ? `${currentTask.text} - ${currentTask.pomodoroCntText}`
        : `${currentTask.text}`;
    } else {
      return currentTask.text;
    }
  };

  return (
    <div className={styles.taskDescription}>
      <StyledTaskDescriptionSpan>
        {!task.allDone && descr()}
      </StyledTaskDescriptionSpan>
    </div>
  );
}

const StyledTaskDescriptionSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  transition: color 1s ease-in-out;
`;

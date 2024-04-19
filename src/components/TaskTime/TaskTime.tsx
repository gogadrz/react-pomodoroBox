import { TaskType } from "../../models/IPomodoro";
import styled from "styled-components";

interface ITaskTime {
  minutes: number;
  seconds: number;
  isActive: boolean;
  task: TaskType;
}

export function TaskTime({ minutes, seconds, isActive, task }: ITaskTime) {
  const strMinutes = minutes.toString().padStart(2, "0");
  const strSeconds = seconds.toString().padStart(2, "0");

  return (
    <StyledTaskTime
      data-target={
        isActive ? (task === TaskType.PomodoroTask ? "task" : "rest") : ""
      }
    >
      {strMinutes}:{strSeconds}
    </StyledTaskTime>
  );
}

const StyledTaskTime = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-family: Roboto;
  font-size: 150px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  margin-right: 15px;
  transition: color 0.5s ease-in-out;
`;

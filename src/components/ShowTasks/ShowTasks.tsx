import { useDispatch, useSelector } from "react-redux";
import styles from "./showtasks.module.css";
import { RootState } from "../../store";
import { PomodorosCounter } from "../PomodorosCounter";
import { EditPomodoroIcon } from "../EditPomodoro/EditPomodoroIcon";
import { useState } from "react";
import {
  clearEditPomodoro,
  fixRests,
  renamePomodoro,
} from "../../store/pomodoroSlice";
import styled from "styled-components";
import { CheckedIcon } from "../icons/CheckedIcon";

export function ShowTasks() {
  const pomodoros = useSelector(
    (state: RootState) => state.pomodoros.pomodoros
  );

  const dispatch = useDispatch();

  const [text, setText] = useState("");

  function setStartText(text: string) {
    setText(text);
  }

  return (
    <>
      <ul className={styles.list}>
        {pomodoros.tasksOnly.map((item) => (
          <StyledListItem key={item.id}>
            <PomodorosCounter counter={item.pomodoroCnt} />
            {item.edit && (
              <input
                type="text"
                value={text}
                autoFocus
                className={styles.pomodoroDescr}
                data-target={item.edit ? "edit" : ""}
                onChange={(event) => {
                  setText(event.currentTarget.value);
                }}
                onKeyDown={(key) => {
                  if (key.code === "Enter") {
                    dispatch(
                      renamePomodoro({
                        id: item.id,
                        text: text,
                      })
                    );
                    dispatch(clearEditPomodoro());
                    dispatch(fixRests());
                  }
                  if (key.code === "Escape") {
                    dispatch(clearEditPomodoro());
                  }
                }}
              />
            )}
            {!item.edit && (
              <div className={styles.pomodoroDescr}>{item.text}</div>
            )}
            {item.done && <CheckedIcon />}
            {!item.done && (
              <EditPomodoroIcon id={item.id} setStartText={setStartText} />
            )}
          </StyledListItem>
        ))}
      </ul>
      {pomodoros.unfinishedPomodoros > 0 && (
        <StyledTotalTime>
          {(pomodoros.unfinishedPomodoros * pomodoros.settings.taskTime) / 60}{" "}
          мин
        </StyledTotalTime>
      )}
    </>
  );
}

const StyledListItem = styled.li`
  &:first-child {
    border-top: 1px solid #e4e4e4;
  }
  position: relative;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  transition: color 1s ease-in-out;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 17px;
  border-bottom: 1px solid #e4e4e4;
  width: 69%;
  padding: 10px 0;
`;

const StyledTotalTime = styled.div`
  color: ${({ theme }) => theme.colors.mutted};
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 17px;
`;

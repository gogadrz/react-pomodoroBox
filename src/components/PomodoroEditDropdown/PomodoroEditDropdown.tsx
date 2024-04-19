import { useDispatch, useSelector } from "react-redux";
import styles from "./pomodoroeditdropdown.module.css";
import {
  decrementPomodoro,
  fixRests,
  getPomodoroById,
  incrementPomodoro,
  setEditPomodoro,
} from "../../store/pomodoroSlice";
import { RootState } from "../../store";
import styled from "styled-components";
import { DeleteConfirm } from "../DeleteConfirm";
import { useState } from "react";

interface IPomodoroEditDropdown {
  id: string;
  setStartText: (text: string) => void;
  showDropdown: (show: boolean) => void;
}

export function PomodoroEditDropdown({
  id,
  setStartText,
  showDropdown,
}: IPomodoroEditDropdown) {
  const dispatch = useDispatch();
  const pomodoros = useSelector(
    (state: RootState) => state.pomodoros.pomodoros
  );
  const disabled =
    getPomodoroById(pomodoros, id).pomodoroCnt < 2 ? "disabled" : "";
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {showDeleteModal && <DeleteConfirm taskId={id} />}
      <StyledList>
        <li
          key={1}
          className={styles.item}
          onClick={() => {
            showDropdown(false);
            dispatch(incrementPomodoro(id));
            dispatch(fixRests());
          }}
        >
          <svg
            className={styles.icon}
            width="18"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 4.25H7.25V7.25H4.25V8.75H7.25V11.75H8.75V8.75H11.75V7.25H8.75V4.25ZM8 0.5C3.8675 0.5 0.5 3.8675 0.5 8C0.5 12.1325 3.8675 15.5 8 15.5C12.1325 15.5 15.5 12.1325 15.5 8C15.5 3.8675 12.1325 0.5 8 0.5ZM8 14C4.6925 14 2 11.3075 2 8C2 4.6925 4.6925 2 8 2C11.3075 2 14 4.6925 14 8C14 11.3075 11.3075 14 8 14Z"
              fill="#A8B64F"
            />
          </svg>
          <span>увеличить</span>
        </li>

        <li
          key={2}
          className={styles.item}
          data-target={disabled ? "disabled" : ""}
          onClick={() => {
            if (disabled) return;
            showDropdown(false);
            dispatch(decrementPomodoro(id));
            dispatch(fixRests());
          }}
        >
          <svg
            className={styles.icon}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
              fill="#A8B64F"
            />
            <path
              d="M5.25 8.25H8.25H9.75H12.75V9.75H9.75H8.25H5.25V8.25Z"
              fill="#A8B64F"
            />
          </svg>
          <span>уменьшить</span>
        </li>

        <li
          key={3}
          className={styles.item}
          onClick={() => {
            const pomododroText = getPomodoroById(pomodoros, id);
            setStartText(pomododroText.text);
            showDropdown(false);
            dispatch(setEditPomodoro(id));
          }}
        >
          <svg
            className={styles.icon}
            width="18"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.545 4.765L9.235 5.455L2.44 12.25H1.75V11.56L8.545 4.765ZM11.245 0.25C11.0575 0.25 10.8625 0.325 10.72 0.4675L9.3475 1.84L12.16 4.6525L13.5325 3.28C13.825 2.9875 13.825 2.515 13.5325 2.2225L11.7775 0.4675C11.6275 0.3175 11.44 0.25 11.245 0.25ZM8.545 2.6425L0.25 10.9375V13.75H3.0625L11.3575 5.455L8.545 2.6425Z"
              fill="#A8B64F"
            />
          </svg>
          <span>редактировать</span>
        </li>

        <li
          key={4}
          className={styles.item}
          onClick={() => {
            const topOfPage = document.querySelector("#body");
            topOfPage?.scrollIntoView({ behavior: "smooth" });
            setShowDeleteModal(true);
          }}
        >
          <svg
            className={styles.icon}
            width="18"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 4.75V12.25H3V4.75H9ZM7.875 0.25H4.125L3.375 1H0.75V2.5H11.25V1H8.625L7.875 0.25ZM10.5 3.25H1.5V12.25C1.5 13.075 2.175 13.75 3 13.75H9C9.825 13.75 10.5 13.075 10.5 12.25V3.25Z"
              fill="#A8B64F"
            />
          </svg>
          <span>удалить</span>
        </li>
      </StyledList>
    </>
  );
}

const StyledList = styled.ul`
  list-style: none;
  padding: 8px 0;
  border: 1px solid #c4c4c4;
  position: absolute;
  top: 50px;
  right: -70px;
  background-color: ${({ theme }) => theme.bgColors.secondary};
  z-index: 100;
  cursor: default;
`;

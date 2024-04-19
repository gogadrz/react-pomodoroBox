import { useEffect, useRef, useState } from "react";
import { PomodoroEditDropdown } from "../PomodoroEditDropdown";
import styled from "styled-components";

interface IEditPomodoroIcon {
  id: string;
  setStartText: (text: string) => void;
}

export function EditPomodoroIcon({ id, setStartText }: IEditPomodoroIcon) {
  const ref = useRef<HTMLButtonElement>(null);

  const [isShowDropdown, setIsShowDropdown] = useState(false);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        setIsShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <StyledDropdownBtn
      onClick={(e) => {
        if (isShowDropdown) return;

        setIsShowDropdown(!isShowDropdown);
      }}
      ref={ref}
    >
      <svg
        width="26"
        height="6"
        viewBox="0 0 26 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
        <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
        <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
      </svg>
      {isShowDropdown && (
        <PomodoroEditDropdown
          id={id}
          setStartText={setStartText}
          showDropdown={setIsShowDropdown}
        />
      )}
    </StyledDropdownBtn>
  );
}

const StyledDropdownBtn = styled.button`
  margin-left: auto;
  border: none;
  border-radius: 50%;
  padding: 14px 6px;
  display: flex;
  background-color: transparent;
  cursor: url("../../cursor/cursor.png"), pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.bgColors.secondary};
  }
`;

import { TaskTime } from "../TaskTime";
import { TaskDescription } from "../TaskDescription";
import { TaskControls } from "../TaskControls";
import { TaskAddTimeBtn } from "../TaskAddTimeBtn";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import styled from "styled-components";
import {
  allTasksDone,
  clearAll,
  getCurrentPomodoro,
  isThisLastTask,
  setDoneSubPomodoro,
  setTaskStatus,
  statAddPauseTime,
  statStopsIncrement,
  toNextSubPomodoro,
} from "../../store/pomodoroSlice";
import { TaskStatus, TaskType } from "../../models/IPomodoro";
import { PomodoroDone } from "../PomodoroDone";
import { PomodoroAllDone } from "../PomodoroAllDone";
import { enToRusDays } from "../../utils/dates";
const NotificationSound = require("./notification.mp3");

export function TaskContent() {
  const task = useSelector((state: RootState) => state.pomodoros.pomodoros);
  const todayWeekDayOffset = enToRusDays(new Date().getDay());

  const [seconds, setSeconds] = useState(task.currentTimer);
  const [pauseSeconds, setPauseSeconds] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAllDoneModal, setShowAllDoneModal] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [done, setDone] = useState(true);
  const [timerId, setTimerId] = useState<NodeJS.Timer>();
  const [pauseTimerId, setPauseTimerId] = useState<NodeJS.Timer>();

  const audioPlayer = useRef<HTMLAudioElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // stop
    if (resetTimer) {
      setResetTimer(false);

      clearInterval(timerId);
      dispatch(setTaskStatus(TaskStatus.Idle));

      setSeconds(task.currentTimer);
      return;
    }

    // pause
    if (task.status === TaskStatus.Paused) {
      clearInterval(timerId);
      dispatch(statStopsIncrement(todayWeekDayOffset));

      setPauseTimerId(
        setInterval(() => {
          setPauseSeconds((pauseSeconds) => pauseSeconds + 1);
        }, 1000)
      );

      return;
    }

    // run
    else if (task.status === TaskStatus.Running && !done) {
      setDone(true);
      clearInterval(pauseTimerId);
      // прописать время этой паузы в объект
      dispatch(
        statAddPauseTime({
          dayOffset: todayWeekDayOffset,
          pauseTime: pauseSeconds,
        })
      );
      setPauseSeconds(0);
      setTimerId(
        setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000)
      );
    }

    // eslint-disable-next-line
  }, [task.status, done]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timerId);
      dispatch(setTaskStatus(TaskStatus.Idle));

      // последняя задача, все остановить
      if (isThisLastTask(task)) {
        if (task.currentPomodoroId) {
          dispatch(
            setDoneSubPomodoro({
              id: task.currentPomodoroId,
              weekDayOffset: todayWeekDayOffset,
            })
          );

          dispatch(allTasksDone());
          setShowAllDoneModal(true);
          playAudio();
          setTimeout(() => {
            setShowAllDoneModal(false);
            dispatch(clearAll());
          }, 2000);
        }
        return;
      }

      // не последняя, переключить на следующую
      dispatch(
        setDoneSubPomodoro({
          id: task.currentPomodoroId,
          weekDayOffset: todayWeekDayOffset,
        })
      );
      dispatch(toNextSubPomodoro());

      // показать модалку - выполнено.
      setShowModal(true);
      playAudio();
      setTimeout(() => {
        setShowModal(false);
        dispatch(setTaskStatus(TaskStatus.Running));
        setDone(false);
      }, 1000);
    } else if (
      task.status === TaskStatus.Idle &&
      task.unfinishedPomodoros === 0
    ) {
      dispatch(allTasksDone());
      setShowAllDoneModal(true);
      playAudio();
      setTimeout(() => {
        setShowAllDoneModal(false);
        dispatch(clearAll());
      }, 3000);
      return;
    }

    // eslint-disable-next-line
  }, [seconds]);

  useEffect(() => {
    setSeconds(task.currentTimer);

    // eslint-disable-next-line
  }, [task.currentPomodoroId]);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.focus();
    }
  }, []);

  function playAudio() {
    audioPlayer.current?.play();
  }

  return (
    <StyledTaskContent>
      <audio ref={audioPlayer} src={NotificationSound} />
      <div style={{ display: "flex" }}>
        <TaskTime
          minutes={Math.trunc(seconds / 60)}
          seconds={seconds % 60}
          isActive={true}
          task={getCurrentPomodoro(task)?.taskType || TaskType.PomodoroTask}
        />
        <TaskAddTimeBtn />
      </div>
      <TaskDescription />
      <TaskControls done={setDone} resetTimerFunc={setResetTimer} />
      {showModal && <PomodoroDone text="Готово." />}
      {showAllDoneModal && <PomodoroAllDone show={setShowAllDoneModal} />}
    </StyledTaskContent>
  );
}

const StyledTaskContent = styled.div`
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColors.secondary};
  transition: background-color 1s ease-in-out;
`;

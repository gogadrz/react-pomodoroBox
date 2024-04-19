import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPomodoro, TaskType, AllData, TaskStatus } from "../models/IPomodoro";
import { ThemeEnum } from "../models/ITheme";
import { nanoid } from "nanoid";
import { createEmptyThreeWeeks } from "../utils/dates";

export interface PomodoroState {
  pomodoros: AllData;
}

const initialState: PomodoroState = {
  pomodoros: {
    tasksOnly: [],
    tasksWithRests: [],
    settings: {
      taskTime: 25 * 60,
      shortRestTime: 5 * 60,
      longReatTime: 15 * 60,
      howOftenLongRest: 3,
    },
    statistics: createEmptyThreeWeeks(),
    totalPomodoros: 0,
    unfinishedPomodoros: 0,
    theme: ThemeEnum.light,
    status: TaskStatus.Idle,
    currentPomodoroId: "",
    currentPomodoroIndex: 0,
    allDone: false,
    currentTimer: 0,
  },
};

const pomodoroSlice = createSlice({
  name: "pomodoros",
  initialState,
  reducers: {
    addPomodoro(
      state: PomodoroState,
      action: PayloadAction<{
        text: string;
        task: TaskType;
        curTheme: ThemeEnum;
      }>
    ) {
      state.pomodoros.tasksOnly.push({
        id: nanoid() + ".00",
        text: action.payload.text,
        pomodoroCnt: 1,
        pomodoroCntText: "Помидор 1",
        edit: false,
        taskType: action.payload.task,
        pomodoroTime:
          action.payload.task === TaskType.PomodoroTask
            ? state.pomodoros.settings.taskTime
            : action.payload.task === TaskType.ShortRest
            ? state.pomodoros.settings.shortRestTime
            : state.pomodoros.settings.longReatTime,
        done: false,
      });

      if (state.pomodoros.tasksOnly.length === 1) {
        state.pomodoros.currentPomodoroId = state.pomodoros.tasksOnly[0].id;
      }
      state.pomodoros.totalPomodoros += 1;
      state.pomodoros.unfinishedPomodoros += 1;
      state.pomodoros.allDone = false;
      state.pomodoros.currentTimer = state.pomodoros.settings.taskTime;
    },

    incrementPomodoro(state: PomodoroState, action: PayloadAction<string>) {
      const changedPomodoro = state.pomodoros.tasksOnly.find(
        (pomodoro) => pomodoro.id === action.payload
      );

      if (changedPomodoro !== undefined) {
        changedPomodoro.pomodoroCnt += 1;
        state.pomodoros.totalPomodoros += 1;
        state.pomodoros.unfinishedPomodoros += 1;
      }

      if (state.pomodoros.allDone) state.pomodoros.allDone = false;
    },

    decrementPomodoro(state: PomodoroState, action: PayloadAction<string>) {
      const changedPomodoro = state.pomodoros.tasksOnly.find(
        (pomodoro) => pomodoro.id === action.payload
      );

      if (changedPomodoro !== undefined) {
        if (changedPomodoro.pomodoroCnt > 1) {
          changedPomodoro.pomodoroCnt -= 1;
          state.pomodoros.totalPomodoros -= 1;
        }

        if (state.pomodoros.unfinishedPomodoros > 1) {
          state.pomodoros.unfinishedPomodoros -= 1;
        }
      }
    },

    renamePomodoro(
      state: PomodoroState,
      action: PayloadAction<{ id: string; text: string }>
    ) {
      let renamedPomodoro = state.pomodoros.tasksOnly.find(
        (pomodoro) => pomodoro.id === action.payload.id
      );

      if (renamedPomodoro !== undefined) {
        renamedPomodoro.text = action.payload.text;
      }
    },

    setEditPomodoro(state: PomodoroState, action: PayloadAction<string>) {
      const editedPomodoro = state.pomodoros.tasksOnly.find(
        (pomodoro) => pomodoro.id === action.payload
      );

      if (editedPomodoro !== undefined) {
        editedPomodoro.edit = true;
      }
    },

    clearEditPomodoro(state: PomodoroState) {
      state.pomodoros.tasksOnly.map((pomodoro) => (pomodoro.edit = false));
    },

    fixRests(state: PomodoroState) {
      if (state.pomodoros.totalPomodoros === 0) {
        return;
      }

      const tasksOnly: IPomodoro[] = state.pomodoros.tasksOnly;

      // =================================================
      // развернуть задачи из нескольких помидоров
      let expandAllPomodoros: IPomodoro[] = [];

      // for (let item of tasksOnly) {
      for (let item = 0; item < tasksOnly.length; item++) {
        for (let count = 0; count < tasksOnly[item].pomodoroCnt; count++) {
          expandAllPomodoros.push({
            ...tasksOnly[item],
            // id: tasksOnly[item].id + String(count),
            id:
              // count > 0
              tasksOnly[item].id.slice(0, -2) + ("00" + count).slice(-2),
            // : tasksOnly[item].id,
            pomodoroCntText:
              count === 0 && tasksOnly[item].pomodoroCnt === 1
                ? "Помидор 1"
                : `Помидор ${count + 1} из ${tasksOnly[item].pomodoroCnt}`,
          });
        }
      }

      // =================================================
      // добавить перерывы к работам
      let restCounter = 0;
      let tasksWithRests: IPomodoro[] = [];

      tasksWithRests.push(expandAllPomodoros[0]);

      for (let index = 1; index < expandAllPomodoros.length; index++) {
        restCounter++;
        if (restCounter > state.pomodoros.settings.howOftenLongRest) {
          restCounter = 0;
          tasksWithRests.push(
            createRestPomodoro(
              state,
              TaskType.LongRest,
              "LR." +
                expandAllPomodoros[index - 1].id.slice(0, -2) +
                ("00" + index).slice(-2)
            )
          );
        } else {
          tasksWithRests.push(
            createRestPomodoro(
              state,
              TaskType.ShortRest,
              "SR." +
                expandAllPomodoros[index - 1].id.slice(0, -2) +
                ("00" + index).slice(-2)
            )
          );
        }

        tasksWithRests.push(expandAllPomodoros[index]);
      }

      state.pomodoros.tasksWithRests = tasksWithRests;
    },

    toggleTaskStatus(state: PomodoroState) {
      switch (state.pomodoros.status) {
        case TaskStatus.Idle:
          state.pomodoros.status = TaskStatus.Running;
          break;

        case TaskStatus.Running:
          state.pomodoros.status = TaskStatus.Paused;
          break;

        case TaskStatus.Paused:
          state.pomodoros.status = TaskStatus.Running;
          break;
      }
    },

    setTaskStatus(state: PomodoroState, action: PayloadAction<TaskStatus>) {
      state.pomodoros.status = action.payload;
    },

    setTheme(state: PomodoroState, action: PayloadAction<ThemeEnum>) {
      state.pomodoros.theme = action.payload;
    },

    removePomodoro(state, action: PayloadAction<string>) {
      let pomodorosCounter = 0;
      let unfinishedPomodoros = 0;
      let newCurPomodoroId = "";
      let currentElement = false;

      const id =
        state.pomodoros.currentPomodoroId.slice(0, 3) === "SR." ||
        state.pomodoros.currentPomodoroId.slice(0, 3) === "LR."
          ? state.pomodoros.currentPomodoroId.slice(3)
          : state.pomodoros.currentPomodoroId;

      // проверить, на удаление текущего помидора
      if (id.slice(0, -3) === action.payload.slice(0, -3)) {
        // да, удаляем текущий помидор
        currentElement = true;

        // следующий элемент существует?
        if (state.pomodoros.tasksOnly.length > 1) {
          // да, сделать id следующего элемента текущим
          // но какой будет следующий?
          newCurPomodoroId = state.pomodoros.tasksOnly[1].id;
        }

        // нет, это единственный элемент
        else {
          newCurPomodoroId = "";
        }
      }

      const deletingPomodoro = state.pomodoros.tasksOnly.find(
        (item) => item.id === action.payload
      );

      if (deletingPomodoro !== undefined) {
        pomodorosCounter = deletingPomodoro.pomodoroCnt;
      }

      const changedState = state.pomodoros.tasksOnly.filter(
        // (pomodoro) => pomodoro.id !== action.payload
        (pomodoro) => pomodoro.id !== action.payload
      );

      state.pomodoros.tasksOnly = changedState;
      state.pomodoros.tasksWithRests = [];
      state.pomodoros.totalPomodoros -= pomodorosCounter;

      // вычислить количество не законченных помидор
      for (let item of state.pomodoros.tasksOnly) {
        if (!item.done) unfinishedPomodoros += item.pomodoroCnt;
      }
      state.pomodoros.unfinishedPomodoros = unfinishedPomodoros;

      if (state.pomodoros.totalPomodoros === 0) {
        state.pomodoros.status = TaskStatus.Idle;
      }

      if (currentElement) {
        state.pomodoros.currentPomodoroId = newCurPomodoroId;
        state.pomodoros.currentPomodoroIndex = 0;
      }
    },

    setTaskTypePomodoro(
      state: PomodoroState,
      action: PayloadAction<{ id: string; typeOfTask: TaskType }>
    ) {
      const settedPomodoro = state.pomodoros.tasksWithRests.find(
        (pomodoro) => pomodoro.id === action.payload.id
      );

      if (settedPomodoro !== undefined) {
        settedPomodoro.taskType = action.payload.typeOfTask;
      }
    },

    toNextSubPomodoro(state: PomodoroState) {
      let updatedState: PomodoroState = state;

      // сохранить текущий индекс
      let nextPomodoroIndex = updatedState.pomodoros.currentPomodoroIndex;

      // поменять id на id следующего помидора
      nextPomodoroIndex++;
      updatedState.pomodoros.currentPomodoroId =
        updatedState.pomodoros.tasksWithRests[nextPomodoroIndex].id;

      // обновить индекс в объекте
      state.pomodoros.currentPomodoroIndex = nextPomodoroIndex;

      if (
        updatedState.pomodoros.tasksWithRests[nextPomodoroIndex].taskType ===
        TaskType.PomodoroTask
      ) {
        updatedState.pomodoros.currentTimer =
          updatedState.pomodoros.settings.taskTime;
      } else if (
        updatedState.pomodoros.tasksWithRests[nextPomodoroIndex].taskType ===
        TaskType.LongRest
      ) {
        updatedState.pomodoros.currentTimer =
          updatedState.pomodoros.settings.longReatTime;
      } else if (
        updatedState.pomodoros.tasksWithRests[nextPomodoroIndex].taskType ===
        TaskType.ShortRest
      ) {
        updatedState.pomodoros.currentTimer =
          updatedState.pomodoros.settings.shortRestTime;
      }

      state = updatedState;
    },

    toNextPomodoro(state: PomodoroState) {
      let nextPomodoroId = "";
      let nextPomodoroIndex = 0;
      const allTasks = state.pomodoros.tasksWithRests;

      for (let index = 0; index < allTasks.length; index++) {
        if (
          allTasks[index].id.slice(-3) === ".00" &&
          allTasks[index].done === false
        ) {
          nextPomodoroId = allTasks[index].id;
          nextPomodoroIndex = index;
        }

        state.pomodoros.currentPomodoroId = nextPomodoroId;
        state.pomodoros.currentPomodoroIndex = nextPomodoroIndex;
      }
    },

    setDoneSubPomodoro(
      state: PomodoroState,
      action: PayloadAction<{ id: string; weekDayOffset: number }>
    ) {
      if (action.payload.id[2] !== ".") {
        let doneCounter =
          state.pomodoros.statistics.threeWeeks[0].week[
            action.payload.weekDayOffset
          ].taskDoneCount;

        doneCounter++;

        state.pomodoros.statistics.threeWeeks[0].week[
          action.payload.weekDayOffset
        ].taskDoneCount = doneCounter;
      }

      let pomodorosTaskOnly: IPomodoro[] = [];
      let done = true;

      // установить done в
      // массиве задач с перерывами
      const donePomodoroTaskWithRests = state.pomodoros.tasksWithRests.find(
        (pomodoro) => pomodoro.id === action.payload.id
      );

      if (donePomodoroTaskWithRests !== undefined) {
        donePomodoroTaskWithRests.done = true;
      }

      // получить только задачи
      for (let task of state.pomodoros.tasksWithRests) {
        if (task.id.slice(0, 3) !== "SR." && task.id.slice(0, 3) !== "LR.") {
          pomodorosTaskOnly.push(task);
        }
      }

      // получить количество помидоров этой задачи (в taskOnly)
      // id который будет указывать на первый элемент группы

      const idFixed =
        action.payload.id.slice(0, 3) === "SR." ||
        action.payload.id.slice(0, 3) === "LR."
          ? action.payload.id
          : action.payload.id.slice(0, -3) + ".00";

      // найти заранее обе задачи
      const taskOnlyPomodoro = state.pomodoros.tasksOnly.find(
        (item) => item.id === idFixed
      );

      const taskWithRestsPomodoro = state.pomodoros.tasksWithRests.find(
        (item) => item.id === idFixed
      );

      if (!taskWithRestsPomodoro) {
        console.log(`task id: ${idFixed} not found!`);
        return;
      }

      for (let task of pomodorosTaskOnly) {
        if (task.id.slice(0, -2) === action.payload.id.slice(0, -2)) {
          if (task.done === false) {
            done = false;
          }
        }
      }

      if (taskOnlyPomodoro) {
        taskOnlyPomodoro.done = done;
      }

      if (
        action.payload.id.slice(0, 3) !== "SR." &&
        action.payload.id.slice(0, 3) !== "LR."
      ) {
        state.pomodoros.unfinishedPomodoros -= 1;
      }
    },

    setDonePomodoro(state: PomodoroState, action: PayloadAction<string>) {
      const task = state.pomodoros.tasksOnly.find(
        (item) => item.id === action.payload.slice(0, -3) + ".00"
      );

      if (task) task.done = true;

      const taskWithRests = state.pomodoros.tasksWithRests.find(
        (item) => item.id === action.payload
      );

      const id = action.payload.slice(0, -3);

      if (taskWithRests) {
        state.pomodoros.tasksWithRests.forEach((item) => {
          if (item.id.slice(0, -3) === id || item.id.slice(3, -3) === id) {
            item.done = true;
          }
        });
      }

      let nextId = "";
      let nextIndex = 0;

      for (
        let index = state.pomodoros.tasksWithRests.length - 1;
        index >= 0;
        index--
      ) {
        if (
          state.pomodoros.tasksWithRests[index].id[2] !== "." &&
          state.pomodoros.tasksWithRests[index].done === false
        ) {
          nextId = state.pomodoros.tasksWithRests[index].id;
          nextIndex = index;
        }
      }

      state.pomodoros.currentPomodoroId = nextId;
      state.pomodoros.currentPomodoroIndex = nextIndex;

      let unfinishedPomodoros = state.pomodoros.totalPomodoros;

      for (let pomodoro of state.pomodoros.tasksWithRests) {
        if (pomodoro.done && pomodoro.id[2] !== ".") unfinishedPomodoros--;
      }

      state.pomodoros.unfinishedPomodoros = unfinishedPomodoros;

      if (state.pomodoros.unfinishedPomodoros === 0) {
        state.pomodoros.allDone = true;
      }
    },

    allTasksDone(state: PomodoroState) {
      state.pomodoros.currentPomodoroId = "";
      state.pomodoros.currentPomodoroIndex = 0;
      state.pomodoros.allDone = true;
      state.pomodoros.currentTimer = 0;
    },

    clearAll(state: PomodoroState) {
      state.pomodoros.allDone = false;
      state.pomodoros.currentPomodoroId = "";
      state.pomodoros.currentPomodoroIndex = 0;
      state.pomodoros.currentTimer = 0;
      state.pomodoros.tasksOnly = [];
      state.pomodoros.tasksWithRests = [];
      state.pomodoros.totalPomodoros = 0;
      state.pomodoros.unfinishedPomodoros = 0;
    },

    statDoneIncrement(state: PomodoroState, action: PayloadAction<number>) {
      // console.log(`statDoneIncrement -> action: ${action.payload}`);

      let doneCounter =
        state.pomodoros.statistics.threeWeeks[0].week[action.payload]
          .taskDoneCount;

      doneCounter++;

      state.pomodoros.statistics.threeWeeks[0].week[
        action.payload
      ].taskDoneCount = doneCounter;
    },

    statStopsIncrement(state: PomodoroState, action: PayloadAction<number>) {
      // console.log("statsStposIncrement called");
      let stopsCounter =
        state.pomodoros.statistics.threeWeeks[0].week[action.payload].taskStops;

      stopsCounter++;

      state.pomodoros.statistics.threeWeeks[0].week[action.payload].taskStops =
        stopsCounter;
    },

    statAddPauseTime(
      state: PomodoroState,
      action: PayloadAction<{ dayOffset: number; pauseTime: number }>
    ) {
      // console.log(
      //   `statAddPauseTime, dayOffset: ${action.payload.dayOffset}, pauseTime: ${action.payload.pauseTime}`
      // );

      state.pomodoros.statistics.threeWeeks[0].week[
        action.payload.dayOffset
      ].taskPauseTime += action.payload.pauseTime;
    },
  },
});

export const {
  addPomodoro,
  incrementPomodoro,
  decrementPomodoro,
  renamePomodoro,
  setEditPomodoro,
  clearEditPomodoro,
  toggleTaskStatus,
  setTaskStatus,
  setTheme,
  removePomodoro,
  setTaskTypePomodoro,
  fixRests,
  toNextSubPomodoro,
  toNextPomodoro,
  setDoneSubPomodoro,
  setDonePomodoro,
  allTasksDone,
  clearAll,

  statDoneIncrement,
  statStopsIncrement,
  statAddPauseTime,
} = pomodoroSlice.actions;

export function getPomodoroStartTime(task: AllData, pomodoro: IPomodoro) {
  switch (pomodoro.taskType) {
    case TaskType.PomodoroTask:
      return task.settings.taskTime;

    case TaskType.LongRest:
      return task.settings.longReatTime;

    case TaskType.ShortRest:
      return task.settings.shortRestTime;

    default:
      return 0;
  }
}

// export function getPomodoroById(pomodoros: IPomodoro[], id: string): IPomodoro {
export function getPomodoroById(pomodoros: AllData, id: string): IPomodoro {
  const curPomodoro = pomodoros.tasksWithRests.find((item) => item.id === id);
  if (curPomodoro !== undefined) {
    return curPomodoro;
  } else {
    return {
      edit: false,
      id: "",
      pomodoroCnt: 0,
      pomodoroCntText: "",
      text: "",
      taskType: TaskType.PomodoroTask,
      pomodoroTime: pomodoros.settings.taskTime,
      done: false,
    };
  }
}

function createRestPomodoro(
  state: PomodoroState,
  restType: TaskType.ShortRest | TaskType.LongRest,
  id: string
): IPomodoro {
  return {
    edit: false,
    // id: nanoid(),
    id: id,
    pomodoroCnt: 1,
    pomodoroCntText:
      restType === TaskType.LongRest ? "Длинный перерыв" : "Перерыв",
    taskType: restType,
    text: restType === TaskType.LongRest ? "Длинный перерыв" : "Перерыв",
    pomodoroTime:
      restType === TaskType.ShortRest
        ? state.pomodoros.settings.shortRestTime
        : state.pomodoros.settings.longReatTime,
    done: false,
  };
}

export function getCurrentPomodoro(allTasks: AllData): IPomodoro | null {
  const id = allTasks.currentPomodoroId;
  if (id === "") {
    return null;
  }

  const currentPomodoro = allTasks.tasksWithRests.find(
    (item) => item.id === id
  );

  if (currentPomodoro === undefined) {
    return null;
  } else {
    return currentPomodoro;
  }
}

export function nextPomodoroTime(allTasks: AllData): number {
  const index = allTasks.currentPomodoroIndex;
  const time = allTasks.tasksWithRests[index + 1].pomodoroTime;
  return time;
}

export function isThisLastTask(allTasks: AllData): boolean {
  const index = allTasks.currentPomodoroIndex;

  if (allTasks.tasksWithRests.length > index + 1) {
    return false;
  } else {
    return true;
  }
}

export default pomodoroSlice.reducer;

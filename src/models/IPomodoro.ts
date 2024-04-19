import { ThemeEnum } from "./ITheme";

export enum TaskType {
  PomodoroTask = "pomodoro",
  LongRest = "long rest",
  ShortRest = "short rest",
}

export enum TaskStatus {
  Running = "running",
  Paused = "paused",
  Idle = "idle",
}

interface ISettings {
  taskTime: number;
  shortRestTime: number;
  longReatTime: number;
  howOftenLongRest: number;
}

export interface IPomodoro {
  id: string;
  text: string;
  pomodoroCnt: number;
  pomodoroCntText: string;
  edit: boolean;
  taskType: TaskType;
  pomodoroTime: number;
  done: boolean;
}

interface IStatisticsOneDay {
  taskId: string | "";
  taskDate: string | "";
  taskStops: number | 0;
  taskPauseTime: number | 0;
  taskDoneCount: number | 0;
}

export interface IStatisticOneWeek {
  week: IStatisticsOneDay[];
}

export interface IStatistics {
  threeWeeks: IStatisticOneWeek[];
}

export interface AllData {
  tasksOnly: IPomodoro[];
  tasksWithRests: IPomodoro[];
  statistics: IStatistics;
  settings: ISettings;
  totalPomodoros: number;
  unfinishedPomodoros: number;
  theme: ThemeEnum;
  status: TaskStatus;
  currentPomodoroId: string;
  currentPomodoroIndex: number;
  allDone: boolean;
  currentTimer: number;
}

export enum WeekDaysFull {
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
}

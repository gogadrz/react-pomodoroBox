import { IStatistics } from "../models/IPomodoro";

export const addInitData = (wData: IStatistics): IStatistics => {
  wData.threeWeeks[0].week[0].taskId = "пн20231020";
  wData.threeWeeks[0].week[0].taskDate = "20231020";
  wData.threeWeeks[0].week[0].taskDoneCount = 3;
  wData.threeWeeks[0].week[0].taskStops = 1;
  wData.threeWeeks[0].week[0].taskPauseTime = 6;

  wData.threeWeeks[0].week[1].taskId = "вт20231021";
  wData.threeWeeks[0].week[1].taskDate = "20231021";
  wData.threeWeeks[0].week[1].taskDoneCount = 10;

  wData.threeWeeks[0].week[2].taskId = "ср20231022";
  wData.threeWeeks[0].week[2].taskDate = "20231022";
  wData.threeWeeks[0].week[2].taskDoneCount = 12;
  wData.threeWeeks[0].week[2].taskStops = 3;
  wData.threeWeeks[0].week[2].taskPauseTime = 4;

  wData.threeWeeks[0].week[3].taskId = "чт20231023";
  wData.threeWeeks[0].week[3].taskDate = "20231023";
  wData.threeWeeks[0].week[3].taskDoneCount = 5;

  wData.threeWeeks[0].week[4].taskId = "пт20231024";
  wData.threeWeeks[0].week[4].taskDate = "20231024";

  wData.threeWeeks[0].week[5].taskId = "сб20231025";
  wData.threeWeeks[0].week[5].taskDate = "20231025";
  wData.threeWeeks[0].week[5].taskDoneCount = 7;

  wData.threeWeeks[0].week[6].taskId = "вс20231026";
  wData.threeWeeks[0].week[6].taskDate = "20231026";
  wData.threeWeeks[0].week[6].taskDoneCount = 8;
  wData.threeWeeks[0].week[6].taskStops = 7;
  wData.threeWeeks[0].week[6].taskPauseTime = 20;
  return wData;
};

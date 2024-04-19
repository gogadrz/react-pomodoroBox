import { IStatisticOneWeek, IStatistics } from "../models/IPomodoro";

const getMondayDate = (curDate: Date): Date => {
  const msDate = curDate.getTime();

  let dayOfWeekOffset = curDate.getDay();
  if (!dayOfWeekOffset) dayOfWeekOffset = 7;

  const curMonday = msDate - (dayOfWeekOffset - 1) * 24 * 60 * 60 * 1000;
  return new Date(curMonday);
};

//////////////////////////////////////////
// создать пустую неделю
const createWeek = (monday: Date): IStatisticOneWeek => {
  let oneWeek: IStatisticOneWeek = { week: [] };
  let dateIndex = new Date(monday);

  for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
    oneWeek.week.push({
      taskDate:
        String(dateIndex.getFullYear()) +
        ("00" + dateIndex.getMonth()).slice(-2) +
        ("00" + dateIndex.getDate()).slice(-2),
      taskDoneCount: 0,
      taskId:
        dateIndex.toLocaleString("ru", { weekday: "short" }) +
        String(dateIndex.getFullYear()) +
        ("00" + dateIndex.getMonth()).slice(-2) +
        ("00" + dateIndex.getDate()).slice(-2),
      taskPauseTime: 0,
      taskStops: 0,
    });
    dateIndex.setDate(dateIndex.getDate() + 1);
  }
  return oneWeek;
};

// ////////////////////////////////
// создать пустые 3 недели
export const createEmptyThreeWeeks = (): IStatistics => {
  const monday = getMondayDate(new Date());
  let weekData: IStatistics = { threeWeeks: [] };

  for (let currentWeek = 0; currentWeek < 3; currentWeek++) {
    weekData.threeWeeks.push(createWeek(monday));
    monday.setDate(monday.getDate() - 7);
  }

  return weekData;
};

/////////////////////////////////////

export const enToRusDays = (offset: number): number => {
  switch (offset) {
    case 0:
      return 6;
    default:
      return offset - 1;
  }
};

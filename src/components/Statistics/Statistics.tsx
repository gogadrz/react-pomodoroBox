import styled, { createGlobalStyle } from "styled-components";
import { Diagram } from "./Diagram";
import { StatisticFocus } from "./StatisticFocus";
import { StatisticPausedtime } from "./StatisticPausedtime";
import { StatisticStops } from "./StatisticStops";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import { WeekDaysFull } from "../../models/IPomodoro";
import { enToRusDays } from "../../utils/dates";

export function Statistics() {
  const pomodoros = useSelector(
    (state: RootState) => state.pomodoros.pomodoros
  );

  const enDayOfWeekOffset = new Date().getDay();
  const rusDayOfWeekOffset = enToRusDays(new Date().getDay());
  const today = pomodoros.statistics.threeWeeks[0].week[rusDayOfWeekOffset];

  const [selectWeek, setSelectWeek] = useState(0);

  let labels: string[] = [];
  let timeData: number[] = [];

  const workTime = today.taskDoneCount * pomodoros.settings.taskTime;
  const totalTime =
    today.taskDoneCount * pomodoros.settings.taskTime + today.taskPauseTime;
  const focus = workTime ? Math.round((workTime * totalTime) / 100) : 0;

  pomodoros.statistics.threeWeeks[selectWeek].week.forEach((day) => {
    labels.push(
      day.taskId.slice(0, 2) +
        " (" +
        day.taskId.slice(-2) +
        "." +
        (Number(day.taskId.slice(-4, -2)) + 1) +
        ")"
    );
    timeData.push(day.taskDoneCount * pomodoros.settings.taskTime);
  });

  return (
    <>
      <GlobalStyle />
      <StyledStatistics>
        <StatisticsTopBlock>
          <StatisticsTitle>Ваша активность</StatisticsTitle>
          <div>
            <select
              style={{
                border: "none",
                borderRadius: "0",
                padding: "8px 100px 8px 10px",
              }}
              value={selectWeek}
              onChange={(ev) => setSelectWeek(Number(ev.currentTarget.value))}
            >
              <option value={0}>Эта неделя</option>
              <option value={1}>Прошлая</option>
              <option value={2}>2 недели назад</option>
            </select>
          </div>
        </StatisticsTopBlock>

        <StatisticMiddleBlock>
          <StatisticDescription>
            <StatisticDescriptionText>
              <h2 className="header">{WeekDaysFull[enDayOfWeekOffset]}</h2>
              <p className="description">
                Вы работали над задачами в течение&nbsp;
                <span className="time">
                  {today.taskDoneCount * pomodoros.settings.taskTime} минуты
                </span>
              </p>
            </StatisticDescriptionText>
            <StatisticDescriptionImage>
              <div className="img">
                <svg
                  width="81"
                  height="81"
                  viewBox="0 0 81 81"
                  fill="none"
                  style={{ marginRight: "15px" }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_16_566)">
                    <path
                      d="M78.8031 47.4453C78.8031 68.5505 61.6937 81.2964 40.5884 81.2964C19.4825 81.2964 2.37305 64.187 2.37305 43.0811C2.37305 21.9758 20.017 9.00003 41.1223 9.00003C62.2283 9.00003 78.8031 26.3393 78.8031 47.4453Z"
                      fill="#DC3E22"
                    />
                    <path
                      d="M57.1821 25.5283C55.3254 23.6378 52.3214 21.8798 50.0845 21.3658C51.3138 20.2757 51.5612 20.2398 53.1011 19.4768C57.0471 17.5237 62.8917 17.3438 62.8917 17.3438C62.8917 17.3438 55.9932 13.7785 50.9492 14.0022C49.6651 14.0587 48.3107 14.5124 47.004 15.1552C47.7408 14.1154 48.439 13.0815 48.8853 12.3048C50.2508 9.92997 51.6862 6.93822 51.6862 6.93822C51.6862 6.93822 46.3974 7.22062 43.9441 10.1567C43.0125 11.2721 42.3092 12.6892 41.7945 14.0186C40.8804 12.9685 39.8715 12.0334 38.8625 11.3035C33.8174 7.65241 25.7565 8.4423 25.7565 8.4423C25.7565 8.4423 31.8459 11.8966 34.5857 15.3425C35.6554 16.6882 36.7411 17.3106 37.3901 18.8194C35.1468 18.3337 30.0853 18.4997 27.6007 19.4209C21.2162 21.7888 18.4651 31.3165 18.4651 31.3165C18.4651 31.3165 24.6953 27.0221 33.1722 24.0095C35.036 23.3473 37.0065 23.1718 38.7239 23.202C37.9443 24.4165 37.0926 25.9936 36.4481 27.8531C34.88 32.3805 36.9521 43.1555 36.9521 43.1555C36.9521 43.1555 41.4915 36.7834 43.3412 31.6218C44.2905 28.9723 44.5255 26.3121 44.5307 24.3491C46.2141 25.0961 48.1968 26.1872 49.6786 27.131C57.2658 31.9651 60.8959 40.7907 60.8959 40.7907C60.8959 40.7907 61.9531 30.3871 57.1821 25.5283Z"
                      fill="#899441"
                    />
                    <path
                      d="M41.5144 20.8766C41.4903 20.8766 41.4662 20.876 41.4421 20.8754C39.9416 20.8365 38.757 19.5894 38.7934 18.0902C38.7965 17.9604 38.9275 8.83157 33.8564 4.86227C32.6735 3.93653 32.4647 2.2272 33.3904 1.04376C34.3168 -0.139053 36.0261 -0.347931 37.2089 0.578423C44.4609 6.25335 44.2446 17.7416 44.2323 18.228C44.1933 19.705 42.9833 20.8766 41.5144 20.8766Z"
                      fill="#A8B64F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_16_566">
                      <rect width="81" height="81" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div className="text">x&nbsp;{today.taskDoneCount}</div>
              </div>
              <div className="descr">{today.taskDoneCount}&nbsp;помидора</div>
            </StatisticDescriptionImage>
          </StatisticDescription>

          <DiagramContainer>
            <EmptyBlock />
            <Diagram labels={labels} timeData={timeData} />
          </DiagramContainer>
        </StatisticMiddleBlock>

        <StatisticBottomBlock>
          <StatisticFocus focus={focus} />
          <StatisticPausedtime pauseTime={today.taskPauseTime} />
          <StatisticStops stopsCount={today.taskStops} />
        </StatisticBottomBlock>
      </StyledStatistics>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
h2, p {
  margin: 0;
  padding: 0;
}
`;

const EmptyBlock = styled.div`
  display: flex;
  flex: 1;
`;

const StyledStatistics = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 5.5%;
  background-color: ${({ theme }) => theme.bgColors.primary};
  transition: background-color 1s ease-in-out;
`;

const StatisticsTopBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 25px;
  justify-content: space-between;
`;

const StatisticsTitle = styled.h2`
  display: flex;
  color: #333;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
`;

const StatisticMiddleBlock = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 32px;
`;

const StatisticDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;
const DiagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f4f4f4;
`;

const StatisticDescriptionText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  background-color: #f4f4f4;
  margin: 0 32px 32px 0;
  padding: 25px;
  .header {
    margin-bottom: 14px;
  }
  .description {
    .time {
      color: red;
    }
  }
`;
const StatisticDescriptionImage = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  background-color: #f4f4f4;
  margin-right: 32px;
  padding-top: 25px;
  .img {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
  }
  .descr {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 51px;
    color: #fff;
    background-color: #dc3e22;
  }
  .text {
    color: #999;
  }
`;

const StatisticBottomBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

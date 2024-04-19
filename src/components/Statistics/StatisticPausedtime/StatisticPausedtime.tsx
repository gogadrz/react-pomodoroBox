import { styled } from "styled-components";

interface IStatisticPausetime {
  pauseTime: number;
}

export function StatisticPausedtime({ pauseTime }: IStatisticPausetime) {
  return (
    <StatisticPausedTime>
      <div className="left">
        <h2>Время на паузе</h2>
        <p>{pauseTime}&nbsp;м</p>
      </div>
      <div className="right">
        <svg
          width="115"
          height="115"
          viewBox="0 0 115 115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M57.3158 111.632C87.3136 111.632 111.632 87.3136 111.632 57.3158C111.632 27.318 87.3136 3 57.3158 3C27.318 3 3 27.318 3 57.3158C3 87.3136 27.318 111.632 57.3158 111.632Z"
            stroke="#9C97D7"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M57.3154 30.1579V57.3158L70.8944 70.8947"
            stroke="#9C97D7"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </StatisticPausedTime>
  );
}

const StatisticPausedTime = styled.div`
  display: flex;
  width: calc(calc(100% - 64px) / 3);
  background-color: #dfdcfe;
  padding: 25px 0;
  .left {
    display: flex;
    flex-direction: column;
    padding-left: 25px;
    align-items: flex-start;
    justify-content: space-between;
  }
  .right {
    display: flex;
    margin-right: 25px;
    margin-left: auto;
  }
  h2 {
    display: flex;
    font-size: 1rem;
    font-weight: 700;
  }
  p {
    display: flex;
    font-size: 3rem;
    font-weight: 400;
  }
`;

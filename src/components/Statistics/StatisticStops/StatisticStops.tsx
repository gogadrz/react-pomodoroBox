import { styled } from "styled-components";

interface IStatisticStops {
  stopsCount: number;
}

export function StatisticStops({ stopsCount }: IStatisticStops) {
  return (
    <StyledStatisticStops>
      <div className="left">
        <h2 className="title">Остановки</h2>
        <p className="value">{stopsCount}</p>
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
            stroke="#7FC2D7"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 20L95 94"
            stroke="#7FC2D7"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </StyledStatisticStops>
  );
}

const StyledStatisticStops = styled.div`
  display: flex;
  width: calc(calc(100% - 64px) / 3);
  padding: 25px 0;
  background-color: #c5f1ff;
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

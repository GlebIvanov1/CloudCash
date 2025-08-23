import { Progress } from "antd";

interface OutcomeStatisticsCardType {
  title: string;
  img: string;
  percent: number;
}

const OutcomeStatisticsCard: React.FC<OutcomeStatisticsCardType> = ({ title, img, percent }) => {
  return (
    <>
      <div className="shopping">
        <div
          className="Imgs"
          style={{
            background:
              title === "Shopping"
                ? "#ffeada"
                : title === "Electronics"
                  ? "#ddf9e4"
                  : title === "Travels"
                    ? "#E4F0FF"
                    : "#ddf9e4",
          }}>
          <img src={img} alt="cart" />
        </div>

        <Progress
          strokeColor={
            title === "Shopping"
              ? "#F79042"
              : title === "Electronics"
                ? "#2BC255"
                : title === "Travels"
                  ? "#70A6E8"
                  : "#2BC255"
          }
          className="Progress"
          percent={percent}
        />
        <p className="StatisticsTitle">{title}</p>
      </div>
    </>
  );
};

export default OutcomeStatisticsCard;

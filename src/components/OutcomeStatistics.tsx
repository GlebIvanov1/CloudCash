import React from "react";
import { useSelector } from "react-redux";
import OutcomeStatisticsCard from "./OutcomeStatisticsCard";

const OutcomeStatistics: React.FC = () => {
  const language = useSelector((state: any) => state.configuration.language);

  return (
    <>
      <div className="OutcomeStatistics">
        <h3>{language === "English" ? "Outcome Statistics" : "Статистика трат"}</h3>

        <div className="Statistics">
          {/* TODO: в будущем когда здесь булдет рендериться через json параметр type будет тоже переведен. */}
          <OutcomeStatisticsCard title="Shopping" img="/OptimiziedSvg/Cart.svg" percent={52} />
          <OutcomeStatisticsCard title="Electronics" img="/OptimiziedSvg/Truck.svg" percent={21} />
          <OutcomeStatisticsCard title="Travels" img="/OptimiziedSvg/Plane.svg" percent={74} />
        </div>
      </div>
    </>
  );
};

export default OutcomeStatistics;

"use client";
import { DonutChart } from "@tremor/react";

interface PieChartComponentProps {
  item: {
    type: string;
    correctCount: number;
    totalCount: number;
  };
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ item }) => {
  const { type, correctCount, totalCount } = item;
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "vocabulary":
        return "אוצר מילים";
      case "grammar":
        return "דקדוק";
      case "openQuestions":
        return "שאלות פתוחות";
      default:
        return type;
    }
  };
  const incorrectCount = totalCount - correctCount;
  const data = [
    { name: "נכון", value: correctCount },
    { name: "לא נכון", value: incorrectCount },
  ];
  return (
    <div className="mx-auto space-y-12">
      <div className="space-y-1">
        <h3 className="text-center text-xs md:text-xl lg:text-2xl 2xl:text-3xl text-grayish">
          {getTypeLabel(item.type)}
        </h3>
        <div className="flex justify-center">
          <DonutChart
            data={data}
            category="value"
            label={
              (correctCount == 0
                ? 0
                : (correctCount / totalCount) * 100
              ).toFixed(1) + "%"
            }
            showAnimation={true}
            animationDuration={1200}
            colors={[
              "darkBeige",
              "lightRed",
              "grayish",
              "blue-700",
              "blue-600",
              "blue-500",
              "blue-400",
            ]}
            className="text-xs sm:text-lg md:text-2xl custom-tooltip text-grayish"
          />
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
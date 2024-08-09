"use client";
import { useEffect, useState } from "react";
import PieChartComponent from "../stats/pieChartComponent";
import SelectLevelTask from "./selectLevelStats";

interface Stats {
  id: string;
  studentId: string;
  questionId: string;
  givenAnswer: string;
  isCorrect: boolean;
  question?: QuestionType;
}

interface QuestionType {
  type: string;
  level: string;
}

interface StudentStatisticsProps {
  studentStats: Stats[];
}

const processStatsData = (stats: Stats[], level: string) => {
  const processedData: Record<
    string,
    { type: string; correctCount: number; totalCount: number }
  > = {};
  stats.forEach((stat) => {
    if (!stat.question) {
      return;
    }
    if (level && stat.question.level !== level && level != " ") {
      return;
    }
    const { type } = stat.question;
    if (!processedData[type]) {
      processedData[type] = { type, correctCount: 0, totalCount: 0 };
    }
    processedData[type].totalCount++;
    if (stat.isCorrect) {
      processedData[type].correctCount++;
    }
  });

  return Object.values(processedData);
};

const StudentStatistics: React.FC<StudentStatisticsProps> = ({
  studentStats,
}) => {
  const [level, setLevel] = useState<string>("");
  const [filteredStats, setFilteredStats] = useState<any[]>([]);

  useEffect(() => {
    const processedStats = processStatsData(studentStats, level);
    setFilteredStats(processedStats);
  }, [studentStats, level]);

  return (
    <>
      <div className="flex justify-center my-2">
        <SelectLevelTask setLevel={setLevel} />
      </div>
      <div className="flex flex-wrap space-x-3 md:space-x-2 sm:px-2 md:px-4 w-4/5 mx-auto justify-center">
        {filteredStats.map((item) => (
          <div className="w-1/4" key={item.type}>
            <PieChartComponent item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentStatistics;

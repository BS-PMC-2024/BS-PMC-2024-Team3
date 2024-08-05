import PieChartComponent from "../stats/pieChartComponent";

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
}

interface StudentStatisticsProps {
  studentStats: Stats[];
}

const processStatsData = (stats: Stats[]) => {
  const processedData: Record<
    string,
    { type: string; correctCount: number; totalCount: number }
  > = {};
  stats.forEach((stat) => {
    if (!stat.question) {
      return;
    }
    const { type } = stat.question;
    if (!processedData[type]) {
      processedData[type] = { type, correctCount: 0, totalCount: 0 };
    }
    processedData[type].totalCount += 1;
    if (stat.isCorrect) {
      processedData[type].correctCount += 1;
    }
  });

  return Object.values(processedData);
};

const StudentStatistics: React.FC<StudentStatisticsProps> = async ({
  studentStats,
}) => {
  const processedStats = processStatsData(studentStats);
  return (
    <>
      {processedStats.map((item) => (
        <div className="w-1/4" key={item.type}>
          <PieChartComponent item={item} />
        </div>
      ))}
    </>
  );
};

export default StudentStatistics;

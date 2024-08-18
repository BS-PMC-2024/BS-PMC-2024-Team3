import { CardWrapper } from "./card-wrapper";
import GameLogo from "@/public/studentCards/GameLogo.png";
import SelfLearningLogo from "@/public/studentCards/SelfLearningLogo.png";
import TasksLogo from "@/public/studentCards/TasksLogo.png";

interface studentOptionCardsProps {
  numberOfTaskToDo?: number;
}

const StudentOptionsCards = ({ numberOfTaskToDo }: studentOptionCardsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center py-12">
      <CardWrapper
        image={GameLogo}
        headerTitle="משחק"
        urlPath="/student/game"
      />
      <CardWrapper
        image={SelfLearningLogo}
        headerTitle="לימוד עצמי"
        urlPath="/student/selflearning"
      />
      <CardWrapper
        image={TasksLogo}
        headerTitle="משימות לביצוע"
        urlPath="/student/tasks"
        badgeContent={numberOfTaskToDo}
      />
    </div>
  );
};

export default StudentOptionsCards;

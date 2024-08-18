import { checkQuestionnaire } from "@/data/user";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface NotificationProps {
  userID: string;
}

const NotificationComponent = async ({ userID }: NotificationProps) => {
  const QuestionnaireNotification = await checkQuestionnaire(userID);
  if (
    QuestionnaireNotification &&
    QuestionnaireNotification.exists &&
    !QuestionnaireNotification.answered
  ) {
    return (
      <Link
        href="/teacher/questionnaire"
        className="relative flex items-center"
      >
        <div className="relative">
          <BellAlertIcon className="h-5 w-5 text-darkRed mr-2" />
          <div className="absolute -top-2 -left-2 h-4 w-4 bg-lightRed text-lightBeige rounded-full flex items-center justify-center text-xs">
            1
          </div>
        </div>
      </Link>
    );
  }

  return null;
};

export default NotificationComponent;

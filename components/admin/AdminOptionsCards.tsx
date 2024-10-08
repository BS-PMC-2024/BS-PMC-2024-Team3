import { CardWrapper } from "./card-wrapper";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import ClipboardDocumentCheckIcon from "@heroicons/react/24/outline/ClipboardDocumentCheckIcon";
import ChartPieIcon from "@heroicons/react/24/outline/ChartPieIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import {
  NumberOfTaskWaitingApproval,
  NumberOfTeachersWaitingApproval,
} from "@/lib/ServerActions/ServerActions";
import { StarIcon } from "@heroicons/react/24/outline";

const adminOptionsCards = async () => {
  const TeachersWaiting = await NumberOfTeachersWaitingApproval();
  const TaskWaiting = await NumberOfTaskWaitingApproval();
  return (
    <div className="rounded-2xl border border-grayish m-4 shadow-grayish shadow-xl">
      <div className="flex flex-wrap items-center justify-center py-16">
        <CardWrapper
          Icon={<CheckCircleIcon width={30} height={30} />}
          headerTitle="אישור מורים"
          urlPath="/admin/teacher-approval"
          badgeContent={TeachersWaiting}
        />
        <CardWrapper
          Icon={<UsersIcon width={30} height={30} />}
          headerTitle="משתמשים"
          urlPath="/admin/users"
        />
        <CardWrapper
          Icon={<ChartPieIcon width={30} height={30} />}
          headerTitle="סטטיסטיקות של תלמידים"
          urlPath="/admin/student-stats"
        />
        <CardWrapper
          Icon={<ClipboardDocumentCheckIcon width={30} height={30} />}
          headerTitle="אישור משימות"
          urlPath="/admin/tasks-approval"
          badgeContent={TaskWaiting}
        />
        <CardWrapper
          Icon={<QuestionMarkCircleIcon width={30} height={30} />}
          headerTitle="שאלון למורים"
          urlPath="/admin/questionnaire"
        />
        <CardWrapper
          Icon={<StarIcon width={30} height={30} />}
          headerTitle="דירוג המורים"
          urlPath="/admin/teacher-reviews"
        />
      </div>
    </div>
  );
};

export default adminOptionsCards;

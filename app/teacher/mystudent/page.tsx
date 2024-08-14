import StudentCard from "@/components/teacher/myStudent/studentCard";
import StudentStatistics from "@/components/student/studentStatistics";
import { getStudentData } from "@/lib/ServerActions/ServerActions";
import { Tasks } from "@/components/teacher/myStudent/tasks";
import TitleAndButton from "@/components/headerNav/TitleAndButton";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
export default async function MyStudent({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const studentData = await getStudentData(searchParams.id);
  let studentDataForCard, studentDataForTask;
  if (studentData) {
    studentDataForCard = {
      name: studentData?.name,
      image: studentData?.image,
      email: studentData?.user.email,
    };
    studentDataForTask = {
      id: studentData.id,
      tasks: studentData.tasks,
      name: studentData?.name,
    };
  }

  return (
    <>
      <div className="w-2/3 mx-auto">
        <TitleAndButton PageName={"דף תלמיד"} />
      </div>
      <div className="flex flex-col space-y-8 justify-center">
        {studentDataForCard && <StudentCard {...studentDataForCard} />}
        {studentData && (
          <>
            {studentData.answers.length >= 1 ? (
              <StudentStatistics studentStats={studentData.answers} />
            ) : (
              <div
                className="flex items-center justify-center text-base lg:text-lg text-darkRed"
                dir="rtl"
              >
                תלמיד זה לא פתר עדין שאלות
                <FaceFrownIcon className="h-6 w-6" />
              </div>
            )}
          </>
        )}
        {studentDataForTask && <Tasks {...studentDataForTask} />}
      </div>
    </>
  );
}

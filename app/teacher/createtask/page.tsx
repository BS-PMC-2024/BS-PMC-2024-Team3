import { TaskCreator } from "@/components/teacher/task/taskCreator";
import { getStudentById } from "@/data/user";

export default async function CreateTask({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const student = await getStudentById(searchParams.id);
  return (
    <>
      <h1
        className="pt-8 px-2 text-2xl sm:text-3xl lg:text-5xl text-center text-darkRed mb-4 sm:mb-8"
        dir="rtl"
      >
        יצירת משימה לתלמיד - {student?.name}
      </h1>
      <div className="flex justify-center min-h-screen md:min-h-[500px] mx-2 lg:mx-8 2xl:mx-16 border border-mediumBeige shadow-xl rounded-lg bg-lightBeige">
        {student && <TaskCreator student={student} />}
      </div>
    </>
  );
}

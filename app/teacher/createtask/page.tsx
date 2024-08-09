import TitleAndButton from "@/components/headerNav/TitleAndButton";
import { TaskCreator } from "@/components/teacher/task/taskCreator";
import { Button } from "@/components/ui/button";
import { getStudentById } from "@/data/user";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function CreateTask({
  searchParams,
@@ -9,12 +13,9 @@ export default async function CreateTask({
  const student = await getStudentById(searchParams.id);
  return (
    <>
      <h1
        className="pt-8 px-2 text-2xl sm:text-3xl lg:text-5xl text-center text-darkRed mb-4 sm:mb-8"
        dir="rtl"
      >
        יצירת משימה לתלמיד - {student?.name}
      </h1>
      <div className="mx-2 lg:mx-8 2xl:mx-16">
        <TitleAndButton PageName={`יצירת משימה לתלמיד - ${student?.name}`} />
      </div>
      <div className="flex justify-center min-h-screen md:min-h-[500px] mx-2 lg:mx-8 2xl:mx-16 border border-mediumBeige shadow-xl rounded-lg bg-lightBeige">
        {student && <TaskCreator student={student} />}
      </div>
    </>
  );
}

import TitleAndButton from "@/components/headerNav/TitleAndButton";
import { TaskCreator } from "@/components/teacher/task/taskCreator";
import { Button } from "@/components/ui/button";
import { getStudentById } from "@/data/user";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function CreateTask({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const student = await getStudentById(searchParams.id);
  return (
    <>
      <div className="mx-2 lg:mx-8 2xl:mx-16">
        <TitleAndButton PageName={`יצירת משימה לתלמיד - ${student?.name}`} />
      </div>
      <div className="flex justify-center min-h-screen md:min-h-[500px] mx-2 lg:mx-8 2xl:mx-16 border border-mediumBeige shadow-xl rounded-lg bg-lightBeige">
        {student && <TaskCreator student={student} />}
      </div>
    </>
  );
}
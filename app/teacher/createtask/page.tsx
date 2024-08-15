import TitleAndButton from "@/components/headerNav/TitleAndButton";
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
      <div className="px-2 sm:px-4 xl:px-16 py-4 lg:py-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <TitleAndButton
          PageName={`יצירת משימה לתלמיד - ${student?.name}`}
          PreviousPageUrl={"/"}
          PreviousPageName={"דף ראשי"}
          SubTitle={true}
        />
      </div>
      <div className="flex justify-center min-h-screen md:min-h-[500px] mx-2 lg:mx-8 2xl:mx-16 border border-mediumBeige shadow-xl rounded-lg bg-lightBeige">
        {student && <TaskCreator student={student} />}
      </div>
    </>
  );
}

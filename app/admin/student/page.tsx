import StudentStatistics from "@/components/student/studentStatistics";
import { getStudentData } from "@/lib/ServerActions/ServerActions";
import TitleAndButton from "@/components/headerNav/TitleAndButton";
import StudentCard from "@/components/teacher/myStudent/studentCard";
import Tabs from "./Tabs";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default async function StudentDataForAdmin({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const studentData = await getStudentData(searchParams.id);
  let studentDataForCard, teacherDataForCard;
  if (studentData) {
    studentDataForCard = {
      name: studentData?.name,
      image: studentData?.image,
      email: studentData?.user.email,
    };
    teacherDataForCard = {
      name: studentData.teacher.name,
      image: studentData.teacher.image,
    };
  }

  return (
    <>
      <div className="flex justify-between px-2 sm:px-4 xl:px-16 py-4 sm:py-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <Link href={"/admin/student-stats"}>
          <Button
            variant={"outline"}
            className="bg-transparent border-lightRed hover:bg-mediumBeige text-lightRed hover:text-black"
          >
            <ArrowUturnLeftIcon width={22} height={22} className="mr-1" />
            חזרה לסטטיסטיקות{" "}
          </Button>
        </Link>
        <div>
          <h2
            className="text-lg sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed"
            dir="rtl"
          >
            דף התלמיד - {studentData?.name}
          </h2>
        </div>
      </div>
      {studentData && studentDataForCard && teacherDataForCard && (
        <div className="flex flex-col space-y-8 justify-center">
          <Tabs
            studentData={studentData}
            teacherDataForCard={teacherDataForCard}
            studentDataForCard={studentDataForCard}
          />
        </div>
      )}
    </>
  );
}

import StudentStatistics from "@/components/student/studentStatistics";
import StudentChoose from "@/components/teacher/StudentChoose";
import { Button } from "@/components/ui/button";
import { getAllStudentsByAdmin } from "@/lib/ServerActions/ServerActions";
import ArrowUturnLeftIcon from "@heroicons/react/24/outline/ArrowUturnLeftIcon";
import Link from "next/link";

const TeacherApproval = async () => {
  const { allStudents, combinedAnswers } = await getAllStudentsByAdmin();
  return (
    <>
      <div className="flex justify-between px-2 sm:px-4 xl:px-16 py-4 sm:py-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <Link href={"/admin"}>
          <Button
            variant={"outline"}
            className="bg-transparent border-lightRed hover:bg-mediumBeige text-lightRed hover:text-black"
          >
            <ArrowUturnLeftIcon width={22} height={22} className="mr-1" />
            חזרה לתפריט אדמין{" "}
          </Button>
        </Link>
        <div>
          <h2
            className="text-lg sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed"
            dir="rtl"
          >
            סטטיסטיקות של כלל הסטודנטים:
          </h2>
        </div>
      </div>
      <StudentStatistics studentStats={combinedAnswers} />
      <StudentChoose allStudents={allStudents} AdminRole={true} />
    </>
  );
};

export default TeacherApproval;

import TitleAndButton from "@/components/headerNav/TitleAndButton";
import StudentStatistics from "@/components/student/studentStatistics";
import StudentChoose from "@/components/teacher/StudentChoose";
import { getAllStudentsByAdmin } from "@/lib/ServerActions/ServerActions";

const TeacherApproval = async () => {
  const { allStudents, combinedAnswers } = await getAllStudentsByAdmin();
  return (
    <>
      <div className="px-2 sm:px-4 xl:px-16 pt-4 lg:pt-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <TitleAndButton
          PageName="סטטיסטיקות של כלל הסטודנטים:"
          PreviousPageUrl={"/admin"}
          PreviousPageName={"תפריט אדמין"}
          SubTitle={true}
        />
      </div>
      <StudentStatistics studentStats={combinedAnswers} />
      <StudentChoose allStudents={allStudents} AdminRole={true} />
    </>
  );
};

export default TeacherApproval;

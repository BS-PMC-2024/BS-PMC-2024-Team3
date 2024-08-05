import { auth } from "@/auth";
import StudentStatistics from "@/components/student/studentStatistics";
import StudentChoose from "@/components/teacher/StudentChoose";
import WelcomePage from "@/components/welcome/welcome";
import { getAllStudentsByTeacher } from "@/lib/ServerActions/ServerActions";
const TeacherPage = async () => {
  const session = await auth();
  const { allStudents, combinedAnswers } = await getAllStudentsByTeacher();
  return (
    <>
      <div>
        {session?.user.name && <WelcomePage name={session?.user.name} />}
      </div>
      {combinedAnswers && (
        <>
          <h2
            className="text-center text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-darkRed mb-1 sm:mb-2"
            dir="rtl"
          >
            סטטיסטיקות של כלל הסטודנטים
          </h2>
          <div className="flex flex-wrap space-x-3 md:space-x-2 sm:px-2 md:px-4 w-full md:w-4/5 mx-auto justify-center">
            <StudentStatistics studentStats={combinedAnswers} />
          </div>
          <StudentChoose allStudents={allStudents} />
        </>
      )}
    </>
  );
};

export default TeacherPage;

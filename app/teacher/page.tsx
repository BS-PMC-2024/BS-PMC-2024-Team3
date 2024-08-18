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
      {combinedAnswers.length > 0 && (
        <>
          <h2
            className="text-center text-xl md:text-2xl lg:text-3xl 2xl:text-4xl text-darkRed mb-1 sm:mb-2"
            dir="rtl"
          >
            סטטיסטיקות של כלל הסטודנטים
          </h2>
          <StudentStatistics studentStats={combinedAnswers} />
        </>
      )}
      <StudentChoose allStudents={allStudents} />
    </>
  );
};

export default TeacherPage;

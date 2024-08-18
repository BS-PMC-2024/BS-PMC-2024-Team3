import { auth } from "@/auth";
import StudentOptionsCards from "@/components/student/StudentOptionsCards";
import StudentStatistics from "@/components/student/studentStatistics";
import WelcomePage from "@/components/welcome/welcome";
import {
  NumberOfTaskToDo,
  studentStats,
} from "@/lib/ServerActions/ServerActions";

const StudentPage = async () => {
  const session = await auth();
  const Stats = await studentStats(session?.user.id);
  const numberOfTaskToDo = await NumberOfTaskToDo(session?.user.id);

  return (
    <>
      <div>
        {session?.user.name && <WelcomePage name={session?.user.name} />}
      </div>
      {Stats && (
        <>
          <h2 className="text-center text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-darkRed mb-1 sm:mb-2">
            סטטיסטיקות
          </h2>
          <StudentStatistics studentStats={Stats} />
        </>
      )}
      <StudentOptionsCards numberOfTaskToDo={numberOfTaskToDo} />
    </>
  );
};

export default StudentPage;

import { auth } from "@/auth";
import StudentOptionsCards from "@/components/student/StudentOptionsCards";
import StudentStatistics from "@/components/student/studentStatistics";
import WelcomePage from "@/components/welcome/welcome";
const StudentPage = async () => {
  const session = await auth();
  return (
    <>
      <div>
        {session?.user.name && <WelcomePage name={session?.user.name} />}
      </div>
      {session?.user.id && (
        <>
          <h2 className="text-center text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-darkRed mb-1 sm:mb-2">
            סטטיסטיקות
          </h2>
          <div className="flex flex-row space-x-3 md:space-x-2 sm:px-2 md:px-4 w-4/5 mx-auto">
          <div className="flex flex-wrap space-x-3 md:space-x-2 sm:px-2 md:px-4 w-4/5 mx-auto justify-center">
            <StudentStatistics id={session?.user.id} />
          </div>
        </>
      )}
      <StudentOptionsCards />
    </>
  );
};
export default StudentPage;
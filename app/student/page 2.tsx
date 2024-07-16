import { auth } from "@/auth";
import StudentOptionsCards from "@/components/student/StudentOptionsCards";
import WelcomePage from "@/components/welcome/welcome";
const StudentPage = async () => {
  const session = await auth();
  return (
    <>
      <div>
        {session?.user.name && <WelcomePage name={session?.user.name} />}
      </div>
      <StudentOptionsCards />
    </>
  );
};

export default StudentPage;

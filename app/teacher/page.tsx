import { auth } from "@/auth";
import WelcomePage from "@/components/welcome/welcome";
const TeacherPage = async () => {
  const session = await auth();
  return (
    <div>{session?.user.name && <WelcomePage name={session?.user.name} />}</div>
  );
};

export default TeacherPage;

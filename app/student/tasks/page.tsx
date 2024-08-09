import TitleAndButton from "@/components/headerNav/TitleAndButton";
import ChooseTask from "@/components/student/chooseTask";
import { getAllTaskByStudentID } from "@/lib/ServerActions/ServerActions";

const StudentTasks = async () => {
  const tasks = await getAllTaskByStudentID();
  return (
    <>
      <div className="mx-2 lg:mx-8 2xl:mx-16">
        <TitleAndButton PageName={"משימות לביצוע"} />
      </div>
      {tasks && <ChooseTask tasks={tasks} />}
    </>
  );
};

export default StudentTasks;

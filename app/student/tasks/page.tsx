import ChooseTask from "@/components/student/chooseTask";
import { getAllTaskByStudentID } from "@/lib/ServerActions/ServerActions";

const StudentTasks = async () => {
  const tasks = await getAllTaskByStudentID();
  return (
    <>
      <h1 className="pt-8 px-2 text-2xl sm:text-3xl lg:text-5xl text-center text-darkRed mb-4 sm:mb-8">
        משימות לביצוע
      </h1>
      {tasks && <ChooseTask tasks={tasks} />}
    </>
  );
};

export default StudentTasks;

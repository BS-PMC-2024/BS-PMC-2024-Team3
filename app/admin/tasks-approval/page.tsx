import TaskList from "@/components/admin/taskList";
import { ApproveTask, DeleteTask } from "@/lib/ServerActions/ServerActions";
import TitleAndButton from "@/components/headerNav/TitleAndButton";
import { getTasksWaitingApproval } from "@/lib/ServerActions/ServerActions";

const TaskApproval = async () => {
  const Tasks = await getTasksWaitingApproval();
  return (
    <>
      <div className="px-2 sm:px-4 xl:px-16 pt-4 lg:pt-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <TitleAndButton
          PageName="אישור משימות חדשות לסטודנטים:"
          PreviousPageUrl={"/admin"}
          PreviousPageName={"תפריט אדמין"}
        />
      </div>
      {Tasks && (
        <TaskList onApprove={ApproveTask} onDelete={DeleteTask} Tasks={Tasks} />
      )}
    </>
  );
};

export default TaskApproval;

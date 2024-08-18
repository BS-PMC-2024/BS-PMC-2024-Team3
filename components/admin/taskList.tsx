"use client";
import { Button } from "../ui/button";
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeacherTask, Question } from "@prisma/client";
import TaskModal from "./taskModal";

interface ExtendedTeacherTask extends TeacherTask {
  questions: Question[];
  teacher: { name: string | null };
  student: { name: string | null };
}

interface TaskListProps {
  Tasks: ExtendedTeacherTask[];
  onApprove: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({ Tasks, onApprove, onDelete }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ExtendedTeacherTask | null>(
    null
  );
  const [TaskList, setTaskList] = useState<ExtendedTeacherTask[]>(Tasks);
  const router = useRouter();

  const TranslateLevel = (level: string) => {
    switch (level) {
      case "Easy":
        return "קל";
      case "Medium":
        return "בינוני";
      case "Hard":
        return "קשה";
      default:
        return "קל";
    }
  };

  const handleOpenmodal = (task: ExtendedTeacherTask) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleAction = async (
    action: (id: number) => Promise<void>,
    id: number
  ) => {
    setIsTaskModalOpen(false);
    setIsLoading(true);
    await action(id);
    setTaskList((prevUsers) =>
      prevUsers.filter((task) => task.id.toString() !== id.toString())
    );
    router.refresh();
    setIsLoading(false);
  };

  return (
    <>
      <div className="rounded-2xl border border-grayish my-4 shadow-grayish shadow-xl p-1 sm:p-2 lg:p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center pb-2 space-x-2">
            <p className="text-darkRed text-xxs py-2" dir="rtl">
              טוען ..
            </p>
            <HashLoader color="#E85A4F" size={25} />
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {TaskList.map((task) => (
              <div
                key={task.id}
                className="text-xs md:text-sm flex justify-between items-center p-2 lg:p-3 rounded-lg border border-mediumBeige bg-lightBeige shadow-lg"
              >
                <div className="flex space-x-1 lg:space-x-3">
                  {onDelete && (
                    <Button
                      variant={"destructive"}
                      className="text-xs md:text-base sm:p-2 hover:bg-red-700"
                      onClick={() => handleAction(onDelete, task.id)}
                    >
                      מחק
                    </Button>
                  )}
                  {onApprove && (
                    <Button
                      variant={"outline"}
                      className="text-xs md:text-base sm:p-2 text-white bg-green-500 hover:bg-green-600"
                      onClick={() => handleAction(onApprove, task.id)}
                    >
                      אישור
                    </Button>
                  )}
                  <Button
                    variant={"outline"}
                    className="text-xs md:text-base sm:p-2 bg-mediumBeige hover:bg-darkBeige"
                    onClick={() => handleOpenmodal(task)}
                  >
                    הצג
                  </Button>
                </div>
                <div className="hidden md:block" dir="rtl">
                  רמה - {TranslateLevel(task.level)}
                </div>
                <div dir="rtl">
                  מורה יוצר - {task.teacher?.name || "ללא שם"}
                </div>
                <div dir="rtl">מס׳ מטלה - {task.id || "ללא שם"}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isTaskModalOpen && selectedTask && (
        <TaskModal
          Task={selectedTask}
          onApprove={onApprove}
          onDelete={onDelete}
          handleCloseModal={handleCloseModal}
          handleAction={handleAction}
        />
      )}
    </>
  );
};
export default TaskList;

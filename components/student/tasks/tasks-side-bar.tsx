"use client";
import React, { useEffect, useState } from "react";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import {
  Question as PrismaQuestion,
  TeacherTask as PrismaTeacherTask,
  StudentAnswer,
} from "@prisma/client";
import TaskLinks from "./taskLinks";
import { useRouter } from "next/navigation";

interface TeacherTask extends PrismaTeacherTask {
  questions: Question[];
}

interface Question extends PrismaQuestion {
  studentAnswers: StudentAnswer[];
}

interface TaskSideBarProps {
  tasks: TeacherTask[];
  taskChosen: string | null;
  handleChooesn: (chosenName: string) => void;
  flagAnswer: boolean;
}

const TaskSideBar: React.FC<TaskSideBarProps> = ({
  tasks,
  taskChosen,
  handleChooesn,
  flagAnswer,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [flagAnswer]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex" dir="rtl">
      <div className="relative sm:static">
        {!isSidebarOpen ? (
          <button
            className="absolute top-0 right-0 mt-1 mr-1 text-darkRed w-10 h-10 sm:hidden z-[600]"
            onClick={toggleSidebar}
            aria-label="Open Sidebar"
          >
            <Squares2X2Icon width={30} height={30} />
          </button>
        ) : (
          <button
            className="absolute top-0 right-0 mt-1 mr-1 text-darkRed w-10 h-10 sm:hidden z-[600]"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <XMarkIcon width={30} height={30} />
          </button>
        )}
      </div>
      <div
        className={`flex flex-col rounded-r-lg w-36 sm:w-48 transform transition-transform ease-in-out duration-300 inset-y-0 right-0 ${
          isSidebarOpen
            ? "translate-x-0 z-[500]"
            : "translate-x-full z-[500] hidden sm:block"
        } sm:translate-x-0 sm:static sm:z-0`}
      >
        <div
          className={`flex flex-col min-h-96 h-full py-12 px-1 sm:px-2 sm:py-3 text-lightRed text-sm md:text-xl whitespace-nowrap rounded-r-lg border-l border-mediumBeige ${
            isSidebarOpen
              ? "z-[500]"
              : "border-transparent bg-transparent sm:border-l sm:border-mediumBeige hidden sm:block"
          }`}
        >
          <TaskLinks
            tasks={tasks}
            isSidebarOpen={isSidebarOpen}
            taskChosen={taskChosen}
            handleChooesn={handleChooesn}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskSideBar;

"use client";
import {
  Question as PrismaQuestion,
  TeacherTask as PrismaTeacherTask,
  StudentAnswer,
} from "@prisma/client";
import { useState } from "react";
import TaskSideBar from "./tasks/tasks-side-bar";
import TaskToDo from "./tasks/taskTodo";

interface TeacherTask extends PrismaTeacherTask {
  questions: Question[];
}

interface Question extends PrismaQuestion {
  studentAnswers: StudentAnswer[];
}

interface ChooseTaskProps {
  tasks: TeacherTask[];
}

const ChooseTask: React.FC<ChooseTaskProps> = ({ tasks }) => {
  const [taskChosen, settaskChosen] = useState<string | null>(null);
  const [flagAnswer, setFlagAnswer] = useState<boolean>(false);

  const handleFlag = () => {
    setFlagAnswer(!flagAnswer);
  };

  const handleChooesn = (ChosenName: string) => {
    settaskChosen(ChosenName);
  };

  const resetCurrentQuestion = () => {
    settaskChosen(null);
  };
  return (
    <div className="flex justify-center min-h-screen md:min-h-[500px] mx-2 lg:mx-8 2xl:mx-16 border border-mediumBeige shadow-xl rounded-lg bg-lightBeige">
      <div className="min-h-screen md:min-h-[500px] flex-grow mx-2">
        {taskChosen && (
          <TaskToDo
            taskChosen={taskChosen}
            tasks={tasks}
            handleFlag={handleFlag}
            resetCurrentQuestion={resetCurrentQuestion}
          />
        )}
      </div>
      {tasks && (
        <TaskSideBar
          tasks={tasks}
          taskChosen={taskChosen}
          handleChooesn={handleChooesn}
          flagAnswer={flagAnswer}
        />
      )}
    </div>
  );
};

export default ChooseTask;

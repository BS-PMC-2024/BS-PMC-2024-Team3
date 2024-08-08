"use client";
import {
  Question as PrismaQuestion,
  TeacherTask as PrismaTeacherTask,
  StudentAnswer,
} from "@prisma/client";
import GrammarTask from "./grammarTask";
import VocabularyTask from "./vocabularyTask";
import OpenQuestionsTask from "./openQuestionsTask";

interface TeacherTask extends PrismaTeacherTask {
  questions: Question[];
}

interface Question extends PrismaQuestion {
  studentAnswers: StudentAnswer[];
}

interface TaskToDo {
  taskChosen: string;
  tasks: TeacherTask[];
  handleFlag: () => void;
  resetCurrentQuestion: () => void;
}

const TaskToDo: React.FC<TaskToDo> = ({
  taskChosen,
  tasks,
  handleFlag,
  resetCurrentQuestion,
}) => {
  const currentQuestion = tasks
    .flatMap((task) => task.questions)
    .find((question) => question.id === taskChosen);

  return (
    <>
      {currentQuestion?.type === "grammar" && (
        <GrammarTask
          question={currentQuestion}
          handleFlag={handleFlag}
          resetCurrentQuestion={resetCurrentQuestion}
        />
      )}
      {currentQuestion?.type === "vocabulary" && (
        <VocabularyTask
          question={currentQuestion}
          handleFlag={handleFlag}
          resetCurrentQuestion={resetCurrentQuestion}
        />
      )}

      {currentQuestion?.type === "openQuestions" && (
        <OpenQuestionsTask
          question={currentQuestion}
          handleFlag={handleFlag}
          resetCurrentQuestion={resetCurrentQuestion}
        />
      )}
    </>
  );
};

export default TaskToDo;

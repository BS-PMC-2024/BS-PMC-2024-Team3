"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Question as PrismaQuestion,
  TeacherTask as PrismaTeacherTask,
  StudentAnswer,
} from "@prisma/client";
import { Fade } from "react-awesome-reveal";
import { HoverCardMessege } from "./hoverMessege";

interface TeacherTask extends PrismaTeacherTask {
  questions: Question[];
  teacher: TeacherType;
}

interface TeacherType {
  name: string | null;
}

interface Question extends PrismaQuestion {
  studentAnswers: StudentAnswer[];
}

interface TaskLinksProps {
  tasks: TeacherTask[];
  isSidebarOpen: boolean;
  taskChosen: string | null;
  handleChooesn: (chosenName: string) => void;
}

const TaskLinks: React.FC<TaskLinksProps> = ({
  tasks,
  taskChosen,
  handleChooesn,
}) => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full z-10">
        {tasks.map((task, index) => {
          const taskDate = new Date(task.date);
          const currentDate = new Date();
          const isTaskDatePast =
            taskDate < currentDate && Number(task.grade) == 0;
          return (
            <AccordionItem key={task.id} value={task.id.toString()}>
              <Fade>
                <AccordionTrigger className="text-base md:text-lg text-darkBeige border-b border-grayish">
                  משימה {index + 1}
                </AccordionTrigger>
                <AccordionContent>
                  {isTaskDatePast ? (
                    <>
                      <div className="text-darkRed font-semibold text-center">
                        מועד ההגשה חלף.
                      </div>
                      <div
                        className="text-sm md:text-base text-darkRed font-semibold text-center"
                        dir="rtl"
                      >
                        ציון: 0
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="text-xs md:text-sm text-grayish font-semibold text-center"
                        dir="rtl"
                      >
                        לביצוע עד :{" "}
                        {new Date(task.date).toLocaleDateString("he-IL")}
                      </div>
                      {task.grade ? (
                        <div
                          className="text-sm md:text-base text-darkRed font-semibold text-center"
                          dir="rtl"
                        >
                          ציון: {task.grade}
                        </div>
                      ) : null}
                      <div className="space-y-2 text-center text-sm md:text-base">
                        <div className="flex justify-center">
                          <HoverCardMessege
                            TeacherName={
                              task.teacher.name ? task.teacher.name : ""
                            }
                            MessegeTxt={task.messageText}
                          />
                        </div>
                        {task.questions.map((question, qIndex) => {
                          const hasStudentAnswer = question.studentAnswers.some(
                            (answer) => answer.questionId === question.id
                          );
                          const hasStudentAnswerCorrect =
                            question.studentAnswers.some(
                              (answer) => answer.isCorrect
                            );
                          return (
                            <div
                              key={question.id}
                              onClick={() =>
                                !hasStudentAnswer && handleChooesn(question.id)
                              }
                              className={`m-2 p-1 rounded-lg flex items-center justify-center gap-3 ${
                                hasStudentAnswer
                                  ? "cursor-not-allowed border border-grayish bg-mediumBeige text-grayish"
                                  : "cursor-pointer hover:bg-gray-100"
                              } ${
                                taskChosen === question.id &&
                                "border border-lightRed bg-mediumBeige text-black hover:bg-grayish/50"
                              }`}
                            >
                              {hasStudentAnswer && (
                                <>
                                  {" "}
                                  {hasStudentAnswerCorrect ? (
                                    <span className="text-green-500 text-xl">
                                      ✓
                                    </span>
                                  ) : (
                                    <span className="text-red-500 text-xl">
                                      ✗
                                    </span>
                                  )}
                                </>
                              )}
                              <span>שאלה {qIndex + 1}</span>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </AccordionContent>
              </Fade>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default TaskLinks;

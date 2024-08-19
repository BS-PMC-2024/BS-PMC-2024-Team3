"use client";
import { TeacherTask, Question } from "@prisma/client";
import { Button } from "../ui/button";

interface ExtendedTeacherTask extends TeacherTask {
  questions: Question[];
  teacher: { name: string | null };
  student: { name: string | null };
}

interface TaskModalProps {
  Task: ExtendedTeacherTask;
  onApprove: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  handleCloseModal: () => void;
  handleAction: (
    action: (id: number) => Promise<void>,
    id: number
  ) => Promise<void>;
}

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

const TaskModal: React.FC<TaskModalProps> = ({
  Task,
  onApprove,
  onDelete,
  handleCloseModal,
  handleAction,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-mediumBeige">
      <div className="relative border bg-lightBeige rounded-lg px-1 py-8 md:p-8 w-11/12 max-w-3xl max-h-screen overflow-y-auto shadow-2xl">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-lightRed hover:text-darkRed hover:scale-110"
        >
          ✕
        </button>
        <h2
          className="text-center text-base md:text-xl text-darkRed font-bold mb-4"
          dir="rtl"
        >
          מס׳ מטלה - {Task.id}
        </h2>
        <div className="m-1 md:my-2">
          <div className="flex justify-between mx-1" dir="rtl">
            <p className="text-sm md:text-base" dir="rtl">
              <span className="text-lightRed"> מורה יוצר: </span>{" "}
              {Task.teacher?.name || "ללא שם"}
            </p>
            <p className="text-sm md:text-base" dir="rtl">
              <span className="text-lightRed"> מועד הגשה: </span>{" "}
              {new Date(Task.date).toLocaleDateString("he-IL") || "אין תאריך"}
            </p>
          </div>
          <div className="flex flex-col spacep-y-1 mx-1">
            <p className="text-sm md:text-base" dir="rtl">
              <span className="text-lightRed">רמה: </span>
              {TranslateLevel(Task.level)}
            </p>
            <p className="text-sm md:text-base" dir="rtl">
              <span className="text-lightRed">שם התלמיד: </span>{" "}
              {Task.student.name || "אין שם"}
            </p>
            <p className="text-sm md:text-base" dir="rtl">
              <span className="text-lightRed">הודעה לתלמיד: </span>{" "}
              {Task.messageText || "אין הודעה"}
            </p>
          </div>
        </div>
        <div className="text-sm md:text-base mb-4" dir="rtl">
          <h3 className="text-center underline font-semibold text-darkRed">
            שאלות:
          </h3>
          {Task.questions.map((question, index) => (
            <div key={question.id} className="flex mt-2 text-lightRed">
              <p className="flex items-center justify-center w-5 h-5 rounded-full border-x border-black">
                {index + 1}
              </p>
              <div className="mr-4">
                <p className="text-sm">
                  <strong className="ml-1 text-black">שאלה:</strong>
                  <span dir="ltr">{question.text}</span>
                </p>
                <p className="text-sm">
                  <strong className="ml-1 text-black">תשובה נכונה:</strong>
                  <span dir="ltr">{question.correctAnswer}</span>
                </p>
                {question.falseAnswer1 && (
                  <p className="text-sm">
                    <strong className="ml-1 text-black">תשובה שגויה 1:</strong>
                    <span dir="ltr">{question.falseAnswer1}</span>
                  </p>
                )}
                {question.falseAnswer2 && (
                  <p className="text-sm">
                    <strong className="ml-1 text-black">תשובה שגויה 2:</strong>
                    <span dir="ltr">{question.falseAnswer2}</span>
                  </p>
                )}
                {question.falseAnswer3 && (
                  <p className="text-sm">
                    <strong className="ml-1 text-black">תשובה שגויה 3:</strong>
                    <span dir="ltr">{question.falseAnswer3}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          {onDelete && (
            <Button
              variant={"destructive"}
              className="text-xs md:text-base sm:p-2 hover:bg-red-700 md:w-24"
              onClick={() => handleAction(onDelete, Task.id)}
            >
              מחק
            </Button>
          )}
          {onApprove && (
            <Button
              variant={"outline"}
              className="text-xs md:text-base sm:p-2 text-white bg-green-500 hover:bg-green-600 md:w-24"
              onClick={() => handleAction(onApprove, Task.id)}
            >
              אישור
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

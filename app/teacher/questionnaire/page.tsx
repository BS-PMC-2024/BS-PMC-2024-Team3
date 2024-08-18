import { auth } from "@/auth";
import TitleAndButton from "@/components/headerNav/TitleAndButton";
import TeacherAnswer from "@/components/teacher/Questionnaire/questionnaire-teacher";
import { getQuestionnaire } from "@/lib/ServerActions/ServerActions";

const QuestionnaireTeacher = async () => {
  const session = await auth();
  const CurrentQuestionnaire = await getQuestionnaire();
  return (
    <>
      <div className="px-2 sm:px-4 xl:px-16 pt-4 lg:pt-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <TitleAndButton
          PageName="מענה על שאלון שיפור ויעול"
          PreviousPageUrl={"/"}
          PreviousPageName={"ראשי"}
          SubTitle={true}
        />
      </div>
      <TeacherAnswer
        CurrentQuestionnaire={CurrentQuestionnaire}
        userName={session?.user.name}
      />
    </>
  );
};

export default QuestionnaireTeacher;

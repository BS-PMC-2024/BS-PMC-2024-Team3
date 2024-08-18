import QuestionnaireForm from "@/components/admin/questionnaireForm";
import TitleAndButton from "@/components/headerNav/TitleAndButton";
import { getQuestionnaire } from "@/lib/ServerActions/ServerActions";

const QuestionnaireContainer = async () => {
  const CurrentQuestionnaire = await getQuestionnaire();
  return (
    <>
      <div className="px-2 sm:px-4 xl:px-16 pt-4 lg:pt-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <TitleAndButton
          PageName="יצירת שאלון שיפור ויעול"
          PreviousPageUrl={"/admin"}
          PreviousPageName={"תפריט אדמין"}
          SubTitle={true}
        />
      </div>
      <div className="w-full md:w-3/4 mx-auto">
        <QuestionnaireForm CurrentQuestionnaire={CurrentQuestionnaire} />
      </div>
    </>
  );
};

export default QuestionnaireContainer;

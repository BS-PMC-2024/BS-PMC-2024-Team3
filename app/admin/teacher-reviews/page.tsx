import TeachersReviews from "@/components/admin/teachers-reviews";
import TitleAndButton from "@/components/headerNav/TitleAndButton";
import { getTeachersReviws } from "@/lib/ServerActions/ServerActions";

const TeacherReviewContainer = async () => {
  const Teachers = await getTeachersReviws();
  return (
    <>
      <div className="px-2 sm:px-4 xl:px-16 pt-4 lg:pt-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <TitleAndButton
          PageName="דירוגי המורים באתר:"
          PreviousPageUrl={"/admin"}
          PreviousPageName={"תפריט אדמין"}
          SubTitle={true}
        />
      </div>
      {Teachers && <TeachersReviews Teachers={Teachers} />}
    </>
  );
};

export default TeacherReviewContainer;

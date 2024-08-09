import TitleAndButton from "@/components/headerNav/TitleAndButton";
import ChooseCategory from "@/components/student/ChooseCategory";

const StudentSelfLearning = async () => {
  return (
    <>
      <div className="mx-2 lg:mx-8 2xl:mx-16">
        <TitleAndButton PageName={"למידה עצמית"} />
      </div>
      <ChooseCategory />
    </>
  );
};

export default StudentSelfLearning;

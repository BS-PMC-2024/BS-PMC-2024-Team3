import ChooseCategory from "@/components/student/ChooseCategory";

const StudentSelfLearning = async () => {
  return (
    <>
      <h1 className="pt-8 px-2 text-2xl sm:text-3xl lg:text-5xl text-center text-darkRed mb-4 sm:mb-8">
        למידה עצמית
      </h1>
      <ChooseCategory />
    </>
  );
};

export default StudentSelfLearning;

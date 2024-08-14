import { getStudentData } from "@/lib/ServerActions/ServerActions";
import TitleAndButton from "@/components/headerNav/TitleAndButton";
import Tabs from "./Tabs";
export default async function StudentDataForAdmin({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const studentData = await getStudentData(searchParams.id);
  let studentDataForCard, teacherDataForCard;
  if (studentData) {
    studentDataForCard = {
      name: studentData?.name,
      image: studentData?.image,
      email: studentData?.user.email,
    };
    teacherDataForCard = {
      name: studentData.teacher.name,
      image: studentData.teacher.image,
    };
  }

  return (
    <>
      <div className="px-2 sm:px-4 xl:px-16 py-4 lg:py-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <TitleAndButton
          PageName={` דף התלמיד - ${studentData?.name}`}
          PreviousPageUrl={"/admin/student-stats"}
          PreviousPageName={"סטטיסטיקות"}
          SubTitle={true}
        />
      </div>
      {studentData && studentDataForCard && teacherDataForCard && (
        <div className="flex flex-col space-y-8 justify-center">
          <Tabs
            studentData={studentData}
            teacherDataForCard={teacherDataForCard}
            studentDataForCard={studentDataForCard}
          />
        </div>
      )}
    </>
  );
}

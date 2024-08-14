import TeachersToApprove from "@/components/admin/teachers-to-approve";
import TitleAndButton from "@/components/headerNav/TitleAndButton";
import { Button } from "@/components/ui/button";
import { getTeachersWaitingApproval } from "@/lib/ServerActions/ServerActions";
import ArrowUturnLeftIcon from "@heroicons/react/24/outline/ArrowUturnLeftIcon";
import Link from "next/link";

const TeacherApproval = async () => {
  const Teachers = await getTeachersWaitingApproval();
  return (
    <>
      <div className="px-2 sm:px-4 xl:px-16 pt-4 lg:pt-8 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <TitleAndButton
          PageName="אישור מורים חדשים לאתר:"
          PreviousPageUrl={"/admin"}
          PreviousPageName={"תפריט אדמין"}
          SubTitle={true}
        />
      </div>
      {Teachers && <TeachersToApprove Teachers={Teachers} />}
    </>
  );
};

export default TeacherApproval;

import TeachersToApprove from "@/components/admin/teachers-to-approve";
import { Button } from "@/components/ui/button";
import { getTeachersWaitingApproval } from "@/lib/ServerActions/ServerActions";
import ArrowUturnLeftIcon from "@heroicons/react/24/outline/ArrowUturnLeftIcon";
import Link from "next/link";

const TeacherApproval = async () => {
  const Teachers = await getTeachersWaitingApproval();
  return (
    <>
      <div className="flex justify-between px-2 sm:px-4 xl:px-16 pt-4 sm:pt-8 lg:pt-16 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <Link href={"/admin"}>
          <Button
            variant={"outline"}
            className="bg-transparent border-lightRed hover:bg-mediumBeige text-lightRed hover:text-black"
          >
            <ArrowUturnLeftIcon width={22} height={22} className="mr-1" />
            חזרה לתפריט אדמין{" "}
          </Button>
        </Link>
        <div>
          <h2
            className="text-lg sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed px-2 sm:px-4 xl:px-16 pt-4 sm:pt-8 lg:pt-16"
            dir="rtl"
          >
            אישור מורים חדשים לאתר:
          </h2>
        </div>
      </div>
      {Teachers && <TeachersToApprove Teachers={Teachers} />}
    </>
  );
};

export default TeacherApproval;

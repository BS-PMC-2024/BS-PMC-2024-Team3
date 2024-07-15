import AllUsersComponent from "@/components/admin/allUsersComponent";
import { Button } from "@/components/ui/button";
import { getAllUsers } from "@/lib/ServerActions/ServerActions";
import ArrowUturnLeftIcon from "@heroicons/react/24/outline/ArrowUturnLeftIcon";
import Link from "next/link";
const Users = async () => {
  const Users = await getAllUsers();
  return (
    <>
      <div className="flex justify-between px-2 sm:px-4 xl:px-16 pt-4 sm:pt-8 lg:pt-16 text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed ">
        <Link href={"/admin"}>
          <Button
            variant={"outline"}
            className="bg-transparent border-grayish hover:bg-mediumBeige text-grayish hover:text-lightRed hover:border-lightRed hover:brightness-110"
          >
            <ArrowUturnLeftIcon width={22} height={22} className="mr-1" />
            <div className="hidden md:block">חזרה לתפריט אדמין </div>
            <div className="block md:hidden">חזרה </div>
          </Button>
        </Link>
        <div>
          <h2 className="text-lg sm:text-3xl font-bold " dir="rtl">
            כל המשתמשים
          </h2>
          <div className="text-base sm:text-xl" dir="rtl">
            {Users?.length} - משתמשים רשומים
          </div>
        </div>
      </div>
      {Users && <AllUsersComponent Users={Users} />}
    </>
  );
};

export default Users;

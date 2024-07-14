"use client";
import HashLoader from "react-spinners/HashLoader";
import { Button } from "../ui/button";
import { useState } from "react";
import { DeleteUser } from "@/lib/ServerActions/ServerActions";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface AllUsersComponent {
  Users: User[];
}

const allUsersComponent: React.FC<AllUsersComponent> = ({ Users }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState(Users);
  const router = useRouter();

  const handleDelete = async (ID: string) => {
    setIsLoading(true);
    await DeleteUser(ID);
    setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== ID));
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="rounded-2xl border border-grayish m-4 shadow-grayish shadow-xl p-1 sm:p-2 lg:p-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center pb-2 space-x-2">
          <p className="text-darkRed text-xxs py-2" dir="rtl">
            טוען ..
          </p>
          <HashLoader color="#E85A4F" size={25} />
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-4">
            {allUsers.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-2 lg:p-3 rounded-lg border border-mediumBeige bg-lightBeige shadow-lg"
              >
                <div className="flex space-x-1 sm:space-x-2 lg:space-x-3">
                  <Button
                    variant={"destructive"}
                    className="text-xs md:text-base"
                    onClick={() => handleDelete(user.id)}
                  >
                    מחק
                  </Button>
                </div>
                <h3 className="text-base md:text-lg text-black">
                  {user.name || "Unnamed Teacher"}
                </h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default allUsersComponent;

import { Button } from "../ui/button";
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string | null;
}

interface UserListProps {
  users: User[];
  onApprove?: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  searchTerm: string;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onApprove,
  onDelete,
  searchTerm,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState(users);
  const router = useRouter();

  const handleAction = async (
    action: (id: string) => Promise<void>,
    id: string
  ) => {
    setIsLoading(true);
    await action(id);
    setUserList((prevUsers) => prevUsers.filter((user) => user.id !== id));
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="rounded-2xl border border-grayish my-4 shadow-grayish shadow-xl p-1 sm:p-2 lg:p-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center pb-2 space-x-2">
          <p className="text-darkRed text-xxs py-2" dir="rtl">
            טוען ..
          </p>
          <HashLoader color="#E85A4F" size={25} />
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {userList
            .filter((user) => user.name && user.name.includes(searchTerm))
            .map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center p-2 lg:p-3 rounded-lg border border-mediumBeige bg-lightBeige shadow-lg"
              >
                <div className="flex space-x-1 sm:space-x-2 lg:space-x-3">
                  {onDelete && (
                    <Button
                      variant={"destructive"}
                      className="text-xs md:text-base hover:bg-red-700"
                      onClick={() => handleAction(onDelete, user.id)}
                    >
                      מחק
                    </Button>
                  )}
                  {onApprove && (
                    <Button
                      variant={"outline"}
                      className="text-white bg-green-500 hover:bg-green-700 text-xs md:text-base"
                      onClick={() => handleAction(onApprove, user.id)}
                    >
                      אישור
                    </Button>
                  )}
                </div>
                <h3 className="text-base md:text-lg text-black">
                  {user.name || "Unnamed Teacher"}
                </h3>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserList;

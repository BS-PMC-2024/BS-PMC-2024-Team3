import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

interface UserCardProps {
  name: string | null;
  image: string | null;
}
const UserCard: React.FC<UserCardProps> = ({ name, image }) => {
  const nameParts = name?.split(" ");
  const userInitials =
    nameParts && nameParts.length >= 2
      ? nameParts[0][0] + nameParts[1][0]
      : "AA";

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <>
          {image ? (
            <div className="flex-shrink-0 relative">
              <Image
                src={image}
                height={128}
                width={128}
                alt={`${name}'s picture`}
                className="rounded-full border border-black dark:border-gray-600 shadow-lg dark:shadow-gray-700"
              />
            </div>
          ) : (
            <div className="relative">
              <Avatar className="w-32 h-32 text-7xl">
                <AvatarImage />
                <AvatarFallback className="bg-lightRed text-lightBeige">
                  {userInitials}
                </AvatarFallback>
              </Avatar>{" "}
            </div>
          )}
          {name && <div className="text-center ">{name}</div>}
        </>
      </div>
    </>
  );
};

export default UserCard;

"use client";
import { Session } from "next-auth";
import { useState } from "react";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Zoom } from "react-awesome-reveal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfile from "./editProfile";
interface ProfileProps {
  session: Session;
}
const UserProfile: React.FC<ProfileProps> = ({ session }) => {
  const [EditImage, setEditImage] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    session.user.image ? session.user.image : ""
  );
  const [name, setName] = useState<string | null>(
    session.user.name ? session.user.name : ""
  );
  const nameParts = name?.split(" ");
  const userInitials =
    nameParts && nameParts.length >= 2
      ? nameParts[0][0] + nameParts[1][0]
      : "AA";
  const handleEditImage = () => {
    setEditImage(!EditImage);
  };
  return (
    <>
      {session.user.name && (
        <div className="flex flex-col">
          {!EditImage ? (
            <>
              <div className="flex flex-col items-center justify-center w-full py-4">
                <h1 className="text-center text-xl sm:text-2xl">פרופיל</h1>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <>
                  {imagePreviewUrl ? (
                    <div className="flex-shrink-0 relative">
                      <Image
                        src={imagePreviewUrl}
                        height={128}
                        width={128}
                        height={128}
                        alt={`${session.user.name}'s picture`}
                        className="rounded-full border border-black dark:border-gray-600 shadow-lg dark:shadow-gray-700"
                      />
                      <div className="absolute bottom-0 right-0 text-white bg-gray-500 opacity-85 dark:opacity-75 rounded-full p-1 cursor-pointer">
                        <PencilIcon
                          className="h-6 w-6 text-white"
                          onClick={handleEditImage}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <Avatar className="w-32 h-32 text-7xl">
                        <AvatarImage />
                        <AvatarFallback className="bg-lightRed text-lightBeige">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>{" "}
                      <div className="absolute bottom-0 right-0 text-white bg-gray-500 opacity-85 dark:opacity-75 rounded-full p-1 cursor-pointer">
                        <PencilIcon
                          className="h-6 w-6 text-white"
                          onClick={handleEditImage}
                        />
                      </div>
                    </div>
                  )}
                </>
              </div>
              <div className="text-center ">{name}</div>
            </>
          ) : (
            <Zoom>
              <EditProfile
                imagePreviewUrl={imagePreviewUrl}
                setImagePreviewUrl={setImagePreviewUrl}
                name={name}
                setName={setName}
                handleEditImage={handleEditImage}
              />
            </Zoom>
          )}
        </div>
      )}
    </>
  );
};
export default UserProfile;
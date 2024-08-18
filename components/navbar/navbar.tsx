import React from "react";
import Navbarcontent from "./navbarcontent";
import { auth } from "@/auth";
import SigninButton from "./signinbutton";
import NotificationComponent from "./NotificationComponent";

const NavBar = async () => {
  const session = await auth();

  return (
    <header className="flex px-3 bg-mediumBeige border-b border-lightBeige">
      <div className="flex justify-between items-center w-full">
        <Navbarcontent />
        <div className="flex flex-row items-center">
          {session?.user.id && session.user.role === "TEACHER" && (
            <NotificationComponent userID={session.user.id} />
          )}
          {session && <SigninButton session={session} />}
        </div>
      </div>
    </header>
  );
};

export default NavBar;

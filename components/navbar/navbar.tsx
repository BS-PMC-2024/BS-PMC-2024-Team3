import React from "react";
import Navbarcontent from "./navbarcontent";
import { auth } from "@/auth";
import SigninButton from "./signinbutton";

const NavBar = async () => {
  const session = await auth();
  return (
    <header className="flex px-2 bg-mediumBeige border-b border-lightBeige">
      <div className="flex justify-between items-center w-full">
        <Navbarcontent />
        <div className="flex flex-row items-center">
          {session && <SigninButton session={session} />}
        </div>
      </div>
    </header>
  );
};

export default NavBar;

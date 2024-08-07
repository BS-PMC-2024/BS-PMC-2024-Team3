"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface SigninButtonProps {
  session: Session;
}

const SigninButton: React.FC<SigninButtonProps> = ({ session }) => {
  const [open, setOpen] = useState<boolean>(false);
  const nameParts = session.user.name?.split(" ");
  const userInitials =
    nameParts && nameParts.length >= 2
      ? nameParts[0][0] + nameParts[1][0]
      : "AA";

  const ChevronRotate = () => {
    setOpen(!open);
  };

  return (
    <DropdownMenu onOpenChange={() => ChevronRotate()}>
      <DropdownMenuTrigger className="flex items-center space-x-2 bg-transparent border border-grayish rounded-lg px-2 py-0.5">
        <p className="text-darkRed" dir="rtl">
          {session.user.name}
        </p>
        {session.user.image ? (
          <>
            <Image
              src={session.user.image ?? ""}
              alt={session.user.name ?? ""}
              className="rounded-full"
              width={32}
              height={32}
            />{" "}
          </>
        ) : (
          <>
            <Avatar>
              <AvatarImage />
              <AvatarFallback className="bg-lightRed text-lightBeige">
                {userInitials}
              </AvatarFallback>
            </Avatar>{" "}
          </>
        )}
        <ChevronDownIcon
          className={`relative top-[1px] ml-1 h-3 w-3 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="shadow-lg rounded-lg bg-lightBeige"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel className="text-lightRed text-center">
          החשבון שלי
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ul className="flex flex-col items-center space-y-2 text-sm sm:text-base">
          {session.user.role === "ADMIN" && (
            <>
              <li className="hover:text-grayish hover:scale-105">
                <Link href="/admin">אדמין פאנל</Link>
              </li>
              <li className="hover:text-grayish hover:scale-105">
                <Link href="/admin/setting">הגדרות</Link>
              </li>
            </>
          )}
          {session.user.role === "STUDENT" && (
            <li className="hover:text-grayish hover:scale-105">
              <Link href="/student/setting">הגדרות</Link>
            </li>
          )}
          {session.user.role === "TEACHER" && (
            <li className="hover:text-grayish hover:scale-105">
              <Link href="/teacher/setting">הגדרות</Link>
            </li>
          )}
          <Button
            variant="destructive"
            className="hover:scale-105 bg-darkRed"
            onClick={() => signOut()}
          >
            התנתקות
          </Button>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SigninButton;

import React from "react";
import { auth } from "../../../auth";
import ChooseCategory from "@/components/setting/ChooseCategory";
import { getContentRating } from "@/lib/ServerActions/ServerActions";
const SettingPage = async () => {
  const session = await auth();
  const Content = await getContentRating();
  return (
    <div>
      <h2
        className="text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-darkRed mb-1 sm:mb-2 mx-2 lg:mx-8 2xl:mx-16"
        dir="rtl"
      >
        הגדרות
      </h2>
      {session && (
        <ChooseCategory
          session={session}
          Content={Content}
          userRole="teacher"
        />
      )}
    </div>
  );
};

export default SettingPage;

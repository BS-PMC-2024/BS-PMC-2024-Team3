"use client";
import { Zoom } from "react-awesome-reveal";
import Image from "next/image";
import Soon from "@/public/SoonGif.webp";
import Loading from "../loading";
import HashLoader from "react-spinners/HashLoader";
const StudentGame = () => {
  return (
    <div
      className="flex flex-col justify-center items-center mx-auto space-y-2"
      dir="rtl"
    >
      <h1 className="pt-8 px-2 text-2xl sm:text-3xl lg:text-5xl text-center text-darkRed mb-4 sm:mb-8">
        יפותח בהמשך ...
      </h1>
      <HashLoader color="#E85A4F" size={40} />
      <div className="mx-auto h-1/4 w-1/4">
        <Zoom>
          <Image
            src={Soon}
            alt={"brainAI"}
            className="rounded-full sm:ml-2 md:ml-8 sm:mr-8 lg:mr-2"
            layout="responsive"
            width={150}
            height={150}
          />
        </Zoom>
      </div>
    </div>
  );
};

export default StudentGame;

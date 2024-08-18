"use client";
import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

export default function Loading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-darkRed text-base py-2" dir="rtl">
        טוען ..
      </p>
      {!isLoading ? <HashLoader color="#E85A4F" size={40} /> : null}
    </div>
  );
}

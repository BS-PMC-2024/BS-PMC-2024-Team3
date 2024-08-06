"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PaperAirplaneIcon from "@heroicons/react/24/outline/PaperAirplaneIcon";
import React from "react";

interface SendComponentProps {
  date: string;
  setDate: (date: string) => void;
  messageText: string;
  setMessageText: (text: string) => void;
  SendToDB: () => void;
}

const SendComponent: React.FC<SendComponentProps> = ({
  date,
  setDate,
  messageText,
  setMessageText,
  SendToDB,
}) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleMessageTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageText(event.target.value);
  };

  const handleBeforeSend = () => {
    if (!date) return;
    if (!messageText) return;
    SendToDB();
  };

  return (
    <>
      <div className="flex flex-col items-center w-full space-y-4 p-2">
        <div className="flex flex-col items-center w-full">
          <Label
            htmlFor="date"
            className="text-base sm:text-xl text-darkRed mb-2"
            dir="rtl"
          >
            תאריך גמר המשימה:
          </Label>
          <Input
            type="date"
            id="date"
            placeholder="YYYY-MM-DD"
            onChange={handleDateChange}
            className="border border-lightRed rounded p-2 w-full sm:w-1/2 mb-4"
          />
        </div>
        <div className="flex flex-col items-center w-full mb-2">
          <Label
            htmlFor="messageText"
            className="text-base sm:text-xl text-darkRed mb-2"
            dir="rtl"
          >
            הודעה לסטודנט:
          </Label>
          <Input
            type="text"
            id="messageText"
            onChange={handleMessageTextChange}
            className="border border-lightRed rounded p-2 w-full sm:w-1/2"
          />
        </div>
        <Button
          variant={"outline"}
          className="bg-lightBeige hover:bg-grayish/50 border border-lightRed rounded-md text-lightRed"
          onClick={() => handleBeforeSend()}
          dir="rtl"
        >
          שלח משימה
          <span>
            <PaperAirplaneIcon className="h-6 w-6 rotate-180 mr-2" />
          </span>
        </Button>
      </div>
    </>
  );
};

export default SendComponent;

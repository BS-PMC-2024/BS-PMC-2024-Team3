"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectLevelTaskProps {
  setLevel: React.Dispatch<React.SetStateAction<string>>;
}

const SelectLevelTask: React.FC<SelectLevelTaskProps> = ({ setLevel }) => {
  return (
    <Select onValueChange={setLevel}>
      <SelectTrigger className="w-[180px] border-lightRed" dir="rtl">
        <SelectValue placeholder="בחר רמת שאלות" dir="rtl" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup dir="rtl">
          <SelectItem value=" ">כל הרמות</SelectItem>
          <SelectItem value="Easy">קל</SelectItem>
          <SelectItem value="Medium">בינוני</SelectItem>
          <SelectItem value="Hard">קשה</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectLevelTask;

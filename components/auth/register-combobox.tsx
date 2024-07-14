"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Teacher } from "@prisma/client";

interface ComboBoxProps {
  teachers: Teacher[];
  teacherSelected: string | null;
  setTeacherSelected: Dispatch<SetStateAction<string | null>>;
  setErrorTeacher: Dispatch<SetStateAction<boolean>>;
}

export function ComboboxDemo({
  teachers,
  teacherSelected,
  setTeacherSelected,
  setErrorTeacher,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const handleError = () => {
    setErrorTeacher(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          dir="rtl"
        >
          {teacherSelected
            ? teachers.find((item) => item?.id === teacherSelected)?.name
            : "בחר מורה ..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="חפש מורה..." className="h-9" dir="rtl" />
          <CommandList>
            <CommandEmpty>לא נמצאו מורים כעת.</CommandEmpty>
            <CommandGroup dir="rtl">
              {teachers.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item?.id}
                  onSelect={(currentTeacherSelected) => {
                    setTeacherSelected(
                      currentTeacherSelected === teacherSelected
                        ? ""
                        : currentTeacherSelected
                    );
                    handleError();
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      teacherSelected === item.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

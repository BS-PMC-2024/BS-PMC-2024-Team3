"use client";
import UserList from "./userList";
import { ApproveTeacher, DeleteUser } from "@/lib/ServerActions/ServerActions";

interface TeachersToApproveProps {
  Teachers: {
    id: string;
    name: string | null;
  }[];
}

const TeachersToApprove: React.FC<TeachersToApproveProps> = ({ Teachers }) => {
  return (
    <UserList
      users={Teachers}
      onApprove={ApproveTeacher}
      onDelete={DeleteUser}
    />
  );
};

export default TeachersToApprove;

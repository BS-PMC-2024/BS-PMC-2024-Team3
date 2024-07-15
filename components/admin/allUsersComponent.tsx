"use client";
import UserList from "./userList";
import { DeleteUser } from "@/lib/ServerActions/ServerActions";
import { User } from "@prisma/client";

interface AllUsersComponentProps {
  Users: User[];
}

const allUsersComponent: React.FC<AllUsersComponentProps> = ({ Users }) => {
  return <UserList users={Users} onDelete={DeleteUser} />;
};

export default allUsersComponent;

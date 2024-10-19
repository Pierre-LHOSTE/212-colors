"use client";
import ColorsTable from "./tables/Color";
import UsersTable from "./tables/Users";

export default function Dashboard() {
  return (
    <>
      <UsersTable />
      <ColorsTable />
    </>
  );
}

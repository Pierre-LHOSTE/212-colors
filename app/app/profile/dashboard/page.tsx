import Dashboard from "@/src/components/dashboard/Dashboard";
import { auth } from "@/src/lib/auth";
import { UserType } from "@/src/types/user";

export default async function DashboardPage() {
  const session = await auth();
  if ((session?.user as UserType).role !== "admin") {
    return <>Unauthorized</>;
  }
  return <Dashboard />;
}

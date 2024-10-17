import { auth } from "@/src/lib/auth";

export default async function Dashboard() {
  const session = await auth();
  return <>Dashboard</>;
}

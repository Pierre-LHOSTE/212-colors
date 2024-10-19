import Header from "@/src/components/header/Header";
import NavProfileAside from "@/src/components/navAside/NavProfileAside";
import { auth } from "@/src/lib/auth";
import { UserType } from "@/src/types/user";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      <NavProfileAside user={session?.user as UserType} />
      <div id="content">
        <Header />
        <main id="main">{children}</main>
      </div>
    </>
  );
}

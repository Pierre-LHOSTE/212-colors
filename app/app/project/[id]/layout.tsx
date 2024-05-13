import Header from "@/src/components/app/header/Header";
import NavProjectAside from "@/src/components/navAside/NavProjectAside";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  return (
    <>
      <NavProjectAside projectId={params.id} />
      <div id="content">
        <Header />
        <main id="main">{children}</main>
      </div>
    </>
  );
}

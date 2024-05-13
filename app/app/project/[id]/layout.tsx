import Header from "@/src/components/app/header/Header";
import NavAside from "@/src/components/navAside/NavAside";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavAside />
      <div id="content">
        <Header />
        <main id="main">{children}</main>
      </div>
    </>
  );
}

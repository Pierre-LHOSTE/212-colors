import Header from "@/src/components/header/Header";
import NavProfileAside from "@/src/components/navAside/NavProfileAside";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavProfileAside />
      <div id="content">
        <Header />
        <main id="main">{children}</main>
      </div>
    </>
  );
}

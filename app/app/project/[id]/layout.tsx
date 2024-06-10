import { getHiddenSections } from "@/src/api/project";
import Header from "@/src/components/app/header/Header";
import CreateThemeColumnModal from "@/src/components/modal/CreateThemeColumnModal/CreateThemeColumnModal";
import CreateColorModal from "@/src/components/modal/createColor/CreateColorModal";
import CreateThemeModal from "@/src/components/modal/createTheme/CreateThemeModal";
import CreateThemeColorModal from "@/src/components/modal/createThemeColor/CreateThemeColorModal";
import NavProjectAside from "@/src/components/navAside/NavProjectAside";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const hiddenSections = await getHiddenSections(params.id);

  if (hiddenSections && "error" in hiddenSections) {
    return <div>{hiddenSections.message}</div>;
  }

  return (
    <>
      <NavProjectAside projectId={params.id} hiddenSections={hiddenSections} />
      <div id="content">
        <Header />
        <main id="main">{children}</main>
        <>
          <CreateColorModal params={params} />
          <CreateThemeModal params={params} />
          <CreateThemeColumnModal params={params} />
          <CreateThemeColorModal params={params} />
        </>
      </div>
    </>
  );
}

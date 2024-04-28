import ProjectLayout from "@/src/components/app/ProjectLayout";
import "./globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProjectLayout projects={[]}>{children}</ProjectLayout>;
}

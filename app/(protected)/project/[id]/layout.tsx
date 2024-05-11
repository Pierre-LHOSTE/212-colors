import ProjectLayout from "@/src/components/app/ProjectLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProjectLayout projects={[]}>{children}</ProjectLayout>;
}

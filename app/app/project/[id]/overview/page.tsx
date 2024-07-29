"use client";
import Overview from "@/src/components/overviewPage/Overview";
import { useDataStore } from "@/src/store/data";

export default function OverviewPage({ params }: { params: { id: string } }) {
  const project = useDataStore((state) => state.project);
  const colors = useDataStore((state) => state.colors);
  const themes = useDataStore((state) => state.themes);
  const themeColors = useDataStore((state) => state.themeColors);
  const themeColumns = useDataStore((state) => state.themeColumns);
  const loading = useDataStore((state) => state.loading);

  return (
    <div id="overview" className="flex-vertical">
      <Overview
        project={project}
        colors={colors}
        themes={themes}
        themeColors={themeColors}
        themeColumns={themeColumns}
        loading={loading}
      />
    </div>
  );
}

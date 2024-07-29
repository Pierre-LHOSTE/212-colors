"use client";
import ColorsCard from "@/src/components/colorsCard/ColorsCard";
import { useDataStore } from "@/src/store/data";
import type { ColorType } from "@/src/types/color";
import { useEffect, useState } from "react";

function ColorsPage({ params }: { params: { id: string } }) {
  const colors = useDataStore((state) => state.colors);
  const loading = useDataStore((state) => state.loading);

  const [primaryColors, setPrimaryColors] = useState<ColorType[]>([]);
  const [secondaryColors, setSecondaryColors] = useState<ColorType[]>([]);
  const [specialColors, setSpecialColors] = useState<ColorType[]>([]);

  useEffect(() => {
    setPrimaryColors(colors.filter((c) => c.type === "primary"));
    setSecondaryColors(colors.filter((c) => c.type === "secondary"));
    setSpecialColors(colors.filter((c) => c.type === "special"));
  }, [colors]);

  return (
    <>
      <div className="flex-horizontal">
        <div className="flex-vertical">
          <ColorsCard
            loading={loading}
            colors={primaryColors}
            name="primary"
            direction="horizontal"
            setColors={setPrimaryColors}
          />
          <ColorsCard
            loading={loading}
            colors={specialColors}
            name="special"
            direction="horizontal"
            setColors={setSpecialColors}
          />
        </div>
        <ColorsCard
          loading={loading}
          colors={secondaryColors}
          name="secondary"
          direction="vertical"
          setColors={setSecondaryColors}
        />
      </div>
    </>
  );
}

export default ColorsPage;

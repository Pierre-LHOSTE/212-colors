"use client";
import { getColors } from "@/src/api/color";
import ColorsCard from "@/src/components/colorsCard/ColorsCard";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import type { ColorType } from "@/src/types/color";
import { useEffect, useState } from "react";

function ColorsPage({ params }: { params: { id: string } }) {
  const setColors = useDataStore((state) => state.setColors);
  const project = useDataStore((state) => state.project);
  const colors = useDataStore((state) => state.colors);

  const [primaryColors, setPrimaryColors] = useState<ColorType[]>([]);
  const [secondaryColors, setSecondaryColors] = useState<ColorType[]>([]);
  const [specialColors, setSpecialColors] = useState<ColorType[]>([]);

  useEffect(() => {
    setPrimaryColors(colors.filter((c) => c.type === "primary"));
    setSecondaryColors(colors.filter((c) => c.type === "secondary"));
    setSpecialColors(colors.filter((c) => c.type === "special"));
  }, [colors]);

  useEffect(() => {
    setPrimaryColors([]);
    setSecondaryColors([]);
    setSpecialColors([]);
    async function fetchColors() {
      const colors = await getColors(project.id);
      if (!colors) {
        return handleError({
          error: true,
          message: "Colors not found",
        });
      }
      if ("error" in colors) {
        return handleError(colors, "Failed to fetch colors");
      }
      setColors(colors);
    }
    fetchColors();
  }, [params.id]);

  return (
    <>
      <div className="flex-horizontal">
        <div className="flex-vertical">
          <ColorsCard
            colors={primaryColors}
            name="primary"
            direction="horizontal"
            setColors={setPrimaryColors}
          />
          <ColorsCard
            colors={specialColors}
            name="special"
            direction="horizontal"
            setColors={setSpecialColors}
          />
        </div>
        <ColorsCard
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

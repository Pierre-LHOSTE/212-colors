"use client";
import { getColors } from "@/src/api/color";
import ColorsCard from "@/src/components/colorsCard/ColorsCard";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import type { ColorType } from "@/src/types/color";
import { useEffect, useState, useTransition } from "react";

function ColorsPage({ params }: { params: { id: string } }) {
  const setColors = useDataStore((state) => state.setColors);
  const project = useDataStore((state) => state.project);
  const colors = useDataStore((state) => state.colors);

  const [isPending, startTransition] = useTransition();

  const [primaryColors, setPrimaryColors] = useState<ColorType[]>([]);
  const [secondaryColors, setSecondaryColors] = useState<ColorType[]>([]);
  const [specialColors, setSpecialColors] = useState<ColorType[]>([]);

  useEffect(() => {
    setPrimaryColors(colors.filter((c) => c.type === "primary"));
    setSecondaryColors(colors.filter((c) => c.type === "secondary"));
    setSpecialColors(colors.filter((c) => c.type === "special"));
  }, [colors]);

  useEffect(() => {
    setColors([]);
    async function fetchColors() {
      const colors = await getColors(params.id);
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
    startTransition(() => fetchColors());
  }, [params.id]);

  return (
    <>
      <div className="flex-horizontal">
        <div className="flex-vertical">
          <ColorsCard
            loading={isPending}
            colors={primaryColors}
            name="primary"
            direction="horizontal"
            setColors={setPrimaryColors}
          />
          <ColorsCard
            loading={isPending}
            colors={specialColors}
            name="special"
            direction="horizontal"
            setColors={setSpecialColors}
          />
        </div>
        <ColorsCard
          loading={isPending}
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

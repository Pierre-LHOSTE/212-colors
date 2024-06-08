import { getColors } from "@/src/api/color";
import ColorsCard from "@/src/components/colorsCard/ColorsCard";
import { ColorType } from "@/src/types/color";

async function ColorsPage({ params }: { params: { id: string } }) {
  const colors = await getColors(params.id);
  const { id } = params;

  const primaryColors: ColorType[] = Array.isArray(colors)
    ? colors.filter((c) => c.type === "primary")
    : [];

  const secondaryColors: ColorType[] = Array.isArray(colors)
    ? colors.filter((c) => c.type === "secondary")
    : [];

  const specialColors: ColorType[] = Array.isArray(colors)
    ? colors.filter((c) => c.type === "special")
    : [];

  return (
    <>
      <div className="flex-horizontal">
        <div className="flex-vertical">
          <ColorsCard
            colors={primaryColors}
            name="Primary"
            direction="horizontal"
          />
          <ColorsCard
            colors={specialColors}
            name="Special"
            direction="horizontal"
          />
        </div>
        <ColorsCard
          colors={secondaryColors}
          name="Secondary"
          direction="vertical"
        />
      </div>
    </>
  );
}

export default ColorsPage;

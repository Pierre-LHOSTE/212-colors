import { getColors } from "@/src/api/color";
import ColorCard from "@/src/components/colorCard/ColorCard";
import { ColorType } from "@/src/types/color";

async function ColorsPage({ params }: { params: { id: string } }) {
  const colors = await getColors(params.id);
  console.log("🚀 ~ colors:", colors);
  console.log("params:");
  console.log(params);

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
          <ColorCard
            colors={primaryColors}
            name="Primary"
            direction="horizontal"
          />
          <ColorCard
            colors={specialColors}
            name="Special"
            direction="horizontal"
          />
        </div>
        <ColorCard
          colors={secondaryColors}
          name="Secondary"
          direction="vertical"
        />
      </div>
    </>
  );
}

export default ColorsPage;

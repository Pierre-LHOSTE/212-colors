import ContentCard from "@/src/components/card/ContentCard";
import Color from "@/src/components/color/Color";
import "./primary-card.scss";

interface colorType {
  name?: string;
  description?: string;
  color: string;
}

function PrimaryCard({ colors }: { colors: colorType[] }) {
  return (
    <ContentCard id="primary-card" title="Primary">
      {colors.map((color, index) => (
        <Color
          key={index}
          name={color.name}
          color={color.color}
          description={color.description}
        />
      ))}
    </ContentCard>
  );
}

export default PrimaryCard;

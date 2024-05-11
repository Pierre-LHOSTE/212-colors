import ContentCard from "@/src/components/card/ContentCard";
import Color from "@/src/components/color/Color";
import "./primary-card.scss";

interface colorType {
  name?: string;
  description?: string;
  color: string;
}

function PrimaryCard() {
  const colors = [
    {
      color: "#FF1818",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
  ];
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

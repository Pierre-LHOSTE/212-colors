import ContentCard from "@/src/components/card/ContentCard";
import Color from "@/src/components/color/Color";
import "./secondary-card.scss";

interface colorType {
  name?: string;
  description?: string;
  color: string;
  type?: string;
}

function SecondaryCard() {
  const colors = [
    {
      color: "#FF1818",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "secondary",
    },
    {
      color: "#0FF818",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "secondary",
    },
    {
      color: "#100FF8",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "secondary",
    },
    {
      color: "#F00FF2",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "secondary",
    },
  ];
  return (
    <ContentCard id="secondary-card" title="Secondary">
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

export default SecondaryCard;

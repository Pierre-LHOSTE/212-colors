import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import "./special-card.scss";

interface colorType {
  name?: string;
  description?: string;
  color: string;
  type?: string;
}

function SpecialCard() {
  const colors = [
    {
      color: "#FF1818",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "success",
    },
    {
      color: "#0FF818",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "error",
    },
    {
      color: "#100FF8",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "warning",
    },
    {
      color: "#F00FF2",
      name: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "info",
    },
  ];
  return (
    <MainCard id="special-card" title="Special">
      {colors.map((color, index) => (
        <Color
          key={index}
          name={color.name}
          color={color.color}
          description={color.description}
        />
      ))}
    </MainCard>
  );
}

export default SpecialCard;

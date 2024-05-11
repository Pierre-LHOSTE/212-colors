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
      color: "#1FBF55",
      name: "Success",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "success",
    },
    {
      color: "#FF1818",
      name: "Error",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "error",
    },
    {
      color: "#C88400",
      name: "Warning",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "warning",
    },
    {
      color: "#D6A3FF",
      name: "Info",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      type: "info",
    },
    {
      color: "#222222",
      name: "Dark",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
    {
      color: "#808080",
      name: "Neutral",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
    {
      color: "#F2F2F2",
      name: "Light",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
    },
  ];
  return (
    <MainCard direction="horizontal" id="special-card" title="Special">
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

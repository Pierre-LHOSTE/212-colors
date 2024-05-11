import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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

  function handleDragEnd(params: any) {
    console.log(params);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="secondary-card" direction="vertical">
        {(provided) => (
          <MainCard
            direction="vertical"
            innerRef={provided.innerRef}
            droppableProps={provided.droppableProps}
            id="secondary-card"
            title="Secondary"
          >
            {colors.map((color, index) => (
              <Color
                key={index}
                name={color.name}
                color={color.color}
                description={color.description}
                id={`color-${index}`}
                index={index}
              />
            ))}
          </MainCard>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SecondaryCard;

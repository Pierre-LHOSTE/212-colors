"use client";
import MainCard from "@/src/components/card/MainCard";
import Color from "@/src/components/color/Color";
import { ThemeColorType } from "@/src/types/color";
import { ThemeColumnType } from "@/src/types/theme";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import NoColor from "../noColor/NoColor";
import "./theme-colors-card.scss";

type ThemeTypeType = "light" | "dark";

interface colorType {
  name?: string;
  description?: string;
  color: string;
}

function ThemeColorsCard({
  colors,
  name,
  themeColumn,
}: {
  colors: (ThemeColorType | null)[];
  name: string;
  type: ThemeTypeType;
  themeColumn: ThemeColumnType[];
}) {
  function handleDragEnd(params: any) {
    console.log(params);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={`theme-card-${name}`} direction="horizontal">
        {(provided) => (
          <MainCard
            className="theme-color-card"
            title={name}
            direction="horizontal"
            innerRef={provided.innerRef}
            droppableProps={provided.droppableProps}
          >
            {/* {colors.map((color, index) => {
              if (color) {
                return (
                  <Color
                    key={index}
                    color={color.color}
                    name={color.name}
                    description={color.description}
                    position={index}
                    id="color"
                  />
                );
              }
              return <>No color</>;
            })} */}
            {themeColumn.map((column, index) => {
              const color = colors
                ? colors.find((c) => c?.themeColumnId === column.id)
                : null;
              if (color) {
                return (
                  <Color
                    key={index}
                    color={color.color}
                    name={color.name}
                    description={color.description}
                    position={index}
                    id="color"
                  />
                );
              } else {
                return (
                  <NoColor
                    key={index}
                    columnName={column.name}
                    id={column.id}
                  />
                );
              }
            })}
            {provided.placeholder}
          </MainCard>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ThemeColorsCard;

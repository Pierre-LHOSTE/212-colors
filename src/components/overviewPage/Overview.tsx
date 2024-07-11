import type PropsType from "./props";
import "./overview.scss";
import InfoCard from "./InfoCard";
import ThemeCardsList from "./ThemeCardsList";
import ColorCard from "./ColorCard";

export default function Overview(props: PropsType) {
  const { project, colors, themes, themeColors, themeColumns } = props;

  return (
    <>
      <div className="flex-horizontal">
        <div className="flex-vertical">
          <InfoCard
            project={project}
            colors={colors}
            themeColors={themeColors}
            themeColumns={themeColumns}
            themes={themes}
          />
          <ThemeCardsList
            themes={themes}
            themeColors={themeColors}
            themeColumns={themeColumns}
          />
        </div>
        <div className="flex-vertical">
          <ColorCard colors={colors} />
        </div>
      </div>
    </>
  );
}

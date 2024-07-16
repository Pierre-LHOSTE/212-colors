import ColorCard from "./ColorCard";
import InfoCard from "./InfoCard";
import "./overview.scss";
import type PropsType from "./props";
import ThemeCardsList from "./ThemeCardsList";

export default function Overview(props: PropsType) {
  const { project, colors, themes, themeColors, themeColumns, loading } = props;

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
            loading={loading}
          />
          <ThemeCardsList
            themes={themes}
            themeColors={themeColors}
            themeColumns={themeColumns}
            loading={loading}
          />
        </div>
        <div className="flex-vertical">
          <ColorCard colors={colors} loading={loading} />
        </div>
      </div>
    </>
  );
}

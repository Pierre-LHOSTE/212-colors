"use client";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import type { ThemeType } from "@/src/types/theme";
import { LoadingOutlined } from "@ant-design/icons";
import { IconPlus } from "@tabler/icons-react";
import { Button, Spin } from "antd";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import MainCard from "../card/MainCard";
import ThemeColumnList from "../themesList/ThemeColumnList";
import ThemesList from "../themesList/ThemeList";
import type { PropsType } from "./props";
import "./theme-page.scss";

export default function ThemesPage(props: PropsType) {
  const { themeColumns, themes, themeColors, loading } = props;

  const setModalState = useModalStore((state) => state.setModalState);
  const setThemes = useDataStore((state) => state.setThemes);

  const { LL } = useI18nContext();

  if (loading)
    return (
      <MainCard className="theme-color-card" direction="horizontal">
        <Spin indicator={<LoadingOutlined spin />} />
      </MainCard>
    );

  return (
    <>
      <ThemeColumnList themeColumns={themeColumns} />
      <OverlayScrollbarsComponent id="theme-scroll" defer={true}>
        <ThemesList
          themes={themes}
          themeColumns={themeColumns}
          themeColors={themeColors}
        />
        <MainCard className="theme-color-card" direction="horizontal">
          <Button
            type="text"
            icon={<IconPlus />}
            onClick={() =>
              setModalState({
                mode: "add",
                id: "theme",
                updateStateCallBack: (theme: ThemeType) =>
                  setThemes((themes) => [...themes, theme]),
              })
            }
          >
            {LL.project.theme.newTheme()}
          </Button>
        </MainCard>
      </OverlayScrollbarsComponent>
    </>
  );
}

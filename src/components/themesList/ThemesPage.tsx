"use client";
import { useDataStore } from "@/src/store/data";
import { useModalStore } from "@/src/store/modal";
import type { ThemeType } from "@/src/types/theme";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "antd";
import MainCard from "../card/MainCard";
import ThemeColumnList from "./ThemeColumnList";
import ThemesList from "./ThemeList";

function ThemesPage() {
  const setModalState = useModalStore((state) => state.setModalState);
  const setThemes = useDataStore((state) => state.setThemes);

  return (
    <>
      <ThemeColumnList />
      <ThemesList />
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
          New theme
        </Button>
      </MainCard>
    </>
  );
}

export default ThemesPage;

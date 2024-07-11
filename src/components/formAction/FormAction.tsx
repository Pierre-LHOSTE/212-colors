"use client";
import { deleteProject } from "@/src/api/project";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { handleError } from "@/src/lib/utils";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import { Button, Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import MainCard from "../card/MainCard";

export default function FormAction({ id }: { id: string }) {
  const router = useRouter();
  const setProjectsList = useDataStore((state) => state.setProjectsList);
  const setMessage = useSettingsStore((state) => state.setMessage);
  const { LL } = useI18nContext();

  async function handleClick() {
    const res = await deleteProject(id);
    if ("error" in res) {
      return handleError(res, "Failed to delete project");
    }
    setMessage({
      type: "success",
      content: "Project deleted successfully",
    });
    setProjectsList((prevState) =>
      prevState.filter((project) => project.id !== id)
    );
    router.push("/app");
  }

  return (
    <MainCard title={LL.project.info.action.title()}>
      <div>
        <Popconfirm
          title={LL.project.info.modal.delete.title()}
          description={LL.project.info.modal.delete.message()}
          okText={LL.global.button.yes()}
          cancelText={LL.global.button.no()}
          onConfirm={handleClick}
        >
          <Button type="primary">{LL.project.info.action.delete()}</Button>
        </Popconfirm>
      </div>
    </MainCard>
  );
}

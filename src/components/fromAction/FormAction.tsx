"use client";
import { deleteProject } from "@/src/api/project";
import { useDataStore } from "@/src/store/data";
import { Button, Popconfirm } from "antd";
import { useRouter } from "next/navigation";
import MainCard from "../card/MainCard";

function FormAction({ id }: { id: string }) {
  const router = useRouter();
  const setProjectsList = useDataStore((state) => state.setProjectsList);

  async function handleClick() {
    const res = await deleteProject(id);
    if ("error" in res) {
      console.error(res.message);
      return;
    }
    setProjectsList((prevState) =>
      prevState.filter((project) => project.id !== id),
    );
    router.push("/app");
  }

  return (
    <MainCard title="Actions">
      <div>
        <Popconfirm
          title="Delete the project"
          description="Are you sure to delete this project?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleClick}
        >
          <Button type="primary">Delete the project</Button>
        </Popconfirm>
      </div>
    </MainCard>
  );
}

export default FormAction;

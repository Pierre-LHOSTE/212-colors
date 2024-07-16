"use client";
import FormAction from "@/src/components/formAction/FormAction";
import FormInfo from "@/src/components/formInfo/FormInfo";
import FormSection from "@/src/components/formSection/FormSection";
import { useDataStore } from "@/src/store/data";
import "./page.scss";

function InfoPage({ params }: { params: { id: string } }) {
  const project = useDataStore((state) => state.project);
  const loading = useDataStore((state) => state.loading);

  return (
    <div id="informations-page">
      <div className="flex-horizontal">
        <FormInfo loading={loading} project={project} />
        <div className="flex-vertical">
          <FormSection id={params.id} />
          <FormAction id={params.id} />
        </div>
      </div>
    </div>
  );
}

export default InfoPage;

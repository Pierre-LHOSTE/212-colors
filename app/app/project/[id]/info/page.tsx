"use client";
import FormInfo from "@/src/components/formInfo/FormInfo";
import FormSection from "@/src/components/formSection/FormSection";
import FormAction from "@/src/components/fromAction/FormAction";
import { useDataStore } from "@/src/store/data";
import "./page.scss";

function InfoPage({ params }: { params: { id: string } }) {
  const project = useDataStore((state) => state.project);

  return (
    <div id="informations-page">
      <div className="flex-horizontal">
        <FormInfo project={project} />
        <div className="flex-vertical">
          <FormSection id={params.id} />
          <FormAction id={params.id} />
        </div>
      </div>
    </div>
  );
}

export default InfoPage;

import { getProjectById } from "@/src/api/project";
import FormInfo from "@/src/components/formInfo/FormInfo";
import FormSection from "@/src/components/formSection/FormSection";
import FormAction from "@/src/components/fromAction/FormAction";
import "./page.scss";

async function InfoPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  if ("error" in project) {
    return <div>{project.message}</div>;
  }

  return (
    <div id="informations-page">
      <div className="flex-horizontal">
        <FormInfo project={project} />
        <div className="flex-vertical">
          <FormSection id={params.id} hiddenSections={project.hiddenSections} />
          <FormAction id={params.id} />
        </div>
      </div>
    </div>
  );
}

export default InfoPage;

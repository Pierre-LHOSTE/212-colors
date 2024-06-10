import { getProjectById } from "@/src/api/project";
import MainCard from "@/src/components/card/MainCard";
import FormInfo from "@/src/components/formInfo/FormInfo";
import "./page.scss";

async function InfoPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  return (
    <div id="informations-page">
      <div className="flex-horizontal">
        <FormInfo project={project} />
        <div className="flex-vertical">
          <MainCard />
          <MainCard />
        </div>
      </div>
    </div>
  );
}

export default InfoPage;

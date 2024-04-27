import { ProjectButtonType } from "@/src/types/project";
import MainAside from "../mainAside/MainAside";
import NavAside from "../navAside/NavAside";
import "./app.scss";
import Header from "./header/Header";

function App({ projects }: { projects: ProjectButtonType[] }) {
  return (
    <div id="app-window">
      <MainAside projects={projects} />
      <NavAside />
      <div id="content">
        <Header />
        <main id="main"></main>
      </div>
    </div>
  );
}

export default App;

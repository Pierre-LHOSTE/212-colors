import SettingsCard from "@/src/components/settingsCard/SettingsCard";
import LinksCard from "@/src/components/linksCard/LinksCard";

async function SettingsPage() {
  return (
    <div className="flex-horizontal">
      <div className="flex-vertical">
        <SettingsCard />
      </div>
      <div className="flex-vertical">
        <LinksCard />
      </div>
    </div>
  );
}

export default SettingsPage;

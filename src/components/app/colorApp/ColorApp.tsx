import PrimaryCard from "../../sections/colorSection/primaryCard/PrimaryCard";
import SecondaryCard from "../../sections/colorSection/secondaryCard/SecondaryCard";
import SpecialCard from "../../sections/colorSection/specialCard/SpecialCard";

function ColorApp() {
  return (
    <>
      <div className="flex-horizontal">
        <div className="flex-vertical">
          <PrimaryCard />
          <SpecialCard />
        </div>
        <SecondaryCard />
      </div>
    </>
  );
}

export default ColorApp;

import PrimaryCard from "../../sections/colorSection/primaryCard/PrimaryCard";
import SecondaryCard from "../../sections/colorSection/secondaryCard/SecondaryCard";
import SpecialCard from "../../sections/colorSection/specialCard/SpecialCard";

function ColorApp() {
  return (
    <>
      <div className="flex-horizontal">
        <div className="flex-vertical">
          {/* <div style={{ backgroundColor: "red", flex: 1 }}></div> */}
          <PrimaryCard />
          {/* <div style={{ backgroundColor: "green", height: 200 }}></div> */}
          <SpecialCard />
        </div>
        {/* <div style={{ backgroundColor: "blue", width: 200 }}></div> */}
        <SecondaryCard />
      </div>
    </>
  );
}

export default ColorApp;

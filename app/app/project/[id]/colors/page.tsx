"use client";
import PrimaryCard from "@/src/components/sections/colorSection/primaryCard/PrimaryCard";
import SecondaryCard from "@/src/components/sections/colorSection/secondaryCard/SecondaryCard";
import SpecialCard from "@/src/components/sections/colorSection/specialCard/SpecialCard";

function ColorsPage() {
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

export default ColorsPage;

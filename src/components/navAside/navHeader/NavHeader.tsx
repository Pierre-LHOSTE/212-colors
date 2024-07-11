import { useDataStore } from "@/src/store/data";
import "./nav-header.scss";
import { usePathname } from "next/navigation";

export default function NavHeader() {
  const pathname = usePathname();
  const project = useDataStore((state) => state.project);

  return (
    <header id="nav-header">
      <div id="nav-header-wrapper">
        <div>
          <span>
            {pathname.endsWith("profile")
              ? "Profile"
              : pathname.endsWith("settings")
                ? "Settings"
                : project.name}
          </span>
        </div>
      </div>
    </header>
  );
}

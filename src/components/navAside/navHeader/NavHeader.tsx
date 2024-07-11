import { useDataStore } from "@/src/store/data";
import "./nav-header.scss";
import { usePathname } from "next/navigation";
import { useI18nContext } from "@/src/i18n/i18n-react";

export default function NavHeader() {
  const pathname = usePathname();
  const project = useDataStore((state) => state.project);
  const { LL } = useI18nContext();

  return (
    <header id="nav-header">
      <div id="nav-header-wrapper">
        <div>
          <span>
            {pathname.endsWith("profile")
              ? LL.profile.navigation.profile()
              : pathname.endsWith("settings")
                ? LL.profile.navigation.settings()
                : project.name}
          </span>
        </div>
      </div>
    </header>
  );
}

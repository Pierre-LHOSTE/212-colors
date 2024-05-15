"use client";
import { useSettingsStore } from "@/src/store/settings";
import {
  IconDeviceDesktop,
  IconInfoCircle,
  IconLayoutNavbar,
  IconPalette,
} from "@tabler/icons-react";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import "./nav-aside.scss";
import NavHeader from "./navHeader/NavHeader";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Vue d'ensemble",
    key: "overview",
    icon: <IconDeviceDesktop />,
  },
  {
    label: "Informations",
    key: "info",
    icon: <IconInfoCircle />,
  },
  {
    label: "Couleurs",
    key: "colors",
    icon: <IconPalette />,
  },
  {
    label: "Thèmes",
    key: "themes",
    icon: <IconLayoutNavbar />,
  },
];

function NavProjectAside({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const setActiveSection = useSettingsStore((state) => state.setActiveSection);

  const itemsMenu = items.map((item) => {
    if (item && !("type" in item)) {
      return {
        ...item,
        label: (
          <Link href={`/app/project/${projectId}/${item.key}`}>
            {item.label}
          </Link>
        ),
        className: path.basename(pathname) === item.key ? "active" : "",
      };
    } else {
      return item;
    }
  });

  return (
    <aside id="nav-aside">
      <NavHeader title="Lorem Ipsum" />
      <Menu
        id="main-nav"
        onClick={({ key }) => setActiveSection(key)}
        selectedKeys={[pathname]}
        mode="vertical"
        items={itemsMenu}
      />
    </aside>
  );
}

export default NavProjectAside;

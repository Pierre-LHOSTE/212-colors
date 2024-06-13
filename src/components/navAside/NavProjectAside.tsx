"use client";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import {
  IconDeviceDesktop,
  IconInfoCircle,
  IconLayoutNavbar,
  IconPalette,
} from "@tabler/icons-react";
import { Menu, type MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./nav-aside.scss";
import NavHeader from "./navHeader/NavHeader";

export default function NavProjectAside() {
  const setActiveSection = useSettingsStore((state) => state.setActiveSection);
  const project = useDataStore((state) => state.project);

  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();

  const itemsMenu = items
    .filter((item) => !project.hiddenSections.includes(item?.key as string))
    .map((item) => {
      if (item && !("type" in item)) {
        return {
          ...item,
          label: (
            <Link href={`/app/project/${project.id}/${item.key}`}>
              {item.label}
            </Link>
          ),
          className: currentPath === item.key ? "active" : "",
        };
      }
      return item;
    });

  return (
    <aside id="nav-aside">
      <NavHeader />
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

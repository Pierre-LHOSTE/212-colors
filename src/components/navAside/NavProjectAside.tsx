"use client";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { useDataStore } from "@/src/store/data";
import { useSettingsStore } from "@/src/store/settings";
import {
  IconDeviceDesktop,
  IconInfoCircle,
  IconLayoutNavbar,
  IconPalette,
} from "@tabler/icons-react";
import { Menu, theme, type MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./nav-aside.scss";
import NavHeader from "./navHeader/NavHeader";

const { useToken } = theme;

export default function NavProjectAside() {
  const setActiveSection = useSettingsStore((state) => state.setActiveSection);
  const project = useDataStore((state) => state.project);

  const { token } = useToken();

  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();
  const { LL } = useI18nContext();

  const items: MenuItem[] = [
    {
      label: LL.project.navigation.overview(),
      key: "overview",
      icon: <IconDeviceDesktop />,
    },
    {
      label: LL.project.navigation.info(),
      key: "info",
      icon: <IconInfoCircle />,
    },
    {
      label: LL.project.navigation.colors(),
      key: "colors",
      icon: <IconPalette />,
    },
    {
      label: LL.project.navigation.themes(),
      key: "themes",
      icon: <IconLayoutNavbar />,
    },
  ];

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
          style:
            currentPath === item.key
              ? { backgroundColor: token.colorBgTextActive }
              : {},
        };
      }
      return item;
    });

  return (
    <aside
      id="nav-aside"
      style={{
        backgroundColor: token.colorBgContainer,
      }}
    >
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

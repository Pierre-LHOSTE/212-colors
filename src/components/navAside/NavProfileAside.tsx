"use client";
import { IconAdjustmentsAlt, IconEdit } from "@tabler/icons-react";
import { Menu, type MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./nav-aside.scss";
import NavHeader from "./navHeader/NavHeader";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link href={"./"}>Profile</Link>,
    key: "profile",
    icon: <IconEdit />,
  },
  {
    label: <Link href={"profile/settings"}>Paramètres</Link>,
    key: "settings",
    icon: <IconAdjustmentsAlt />,
  },
];

export default function NavProfileAside() {
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();

  const itemsMenu = items.map((item) => {
    if (item && !("type" in item)) {
      return {
        ...item,
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
        // onClick={onClick}
        selectedKeys={[pathname]}
        mode="vertical"
        items={itemsMenu}
      />
    </aside>
  );
}

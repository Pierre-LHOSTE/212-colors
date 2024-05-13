"use client";
import { IconAdjustmentsAlt, IconEdit } from "@tabler/icons-react";
import { Menu, MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
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

function NavProfileAside() {
  const pathname = usePathname();

  const itemsMenu = items.map((item) => {
    if (item && !("type" in item)) {
      return {
        ...item,
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
        // onClick={onClick}
        selectedKeys={[pathname]}
        mode="vertical"
        items={itemsMenu}
      />
    </aside>
  );
}

export default NavProfileAside;

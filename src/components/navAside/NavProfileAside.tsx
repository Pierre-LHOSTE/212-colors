"use client";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { UserType } from "@/src/types/user";
import { IconAdjustmentsAlt, IconEdit, IconGraph } from "@tabler/icons-react";
import { Menu, type MenuProps } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./nav-aside.scss";
import NavHeader from "./navHeader/NavHeader";

type MenuItem = Required<MenuProps>["items"][number];

export default function NavProfileAside({ user }: { user: UserType }) {
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();
  const { LL } = useI18nContext();

  const items: MenuItem[] = [
    {
      label: <Link href={"./"}>{LL.profile.navigation.profile()}</Link>,
      key: "profile",
      icon: <IconEdit />,
    },
    {
      label: (
        <Link href={"/app/profile/settings"}>
          {LL.profile.navigation.settings()}
        </Link>
      ),
      key: "settings",
      icon: <IconAdjustmentsAlt />,
    },
    ...(user.role === "admin"
      ? [
          {
            label: (
              <Link href={"/app/profile/dashboard"}>
                {LL.profile.navigation.dashboard()}
              </Link>
            ),
            key: "dashboard",
            icon: <IconGraph />,
          },
        ]
      : []),
  ];

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

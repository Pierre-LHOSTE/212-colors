"use client";
import { Typography } from "antd";
import MainCard from "../card/MainCard";
import { useI18nContext } from "@/src/i18n/i18n-react";

export default function LinksCard() {
  const { Link } = Typography;
  const { LL } = useI18nContext();

  return (
    <MainCard id="links-card" title={LL.profile.settings.links()}>
      <Link href="" target="_blank">
        Home page
      </Link>
      <Link href="https://github.com/Pierre-LHOSTE/212-colors" target="_blank">
        Github
      </Link>
    </MainCard>
  );
}

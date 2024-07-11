"use client";
import { Typography } from "antd";
import MainCard from "../card/MainCard";

export default function LinksCard() {
  const { Link } = Typography;

  return (
    <MainCard id="links-card" title="Links">
      <Link href="" target="_blank">
        Home page
      </Link>
      <Link href="https://github.com/Pierre-LHOSTE/212-colors" target="_blank">
        Github
      </Link>
    </MainCard>
  );
}

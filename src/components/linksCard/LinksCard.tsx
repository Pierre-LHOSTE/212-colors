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
      <Link href="" target="_blank">
        Github
      </Link>
    </MainCard>
  );
}

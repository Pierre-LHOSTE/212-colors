import { Typography } from "antd";
import "./empty.scss";

export default function Empty({
  name,
  icon,
}: {
  name: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="empty">
      {icon}
      <Typography.Text>{name}</Typography.Text>
    </div>
  );
}

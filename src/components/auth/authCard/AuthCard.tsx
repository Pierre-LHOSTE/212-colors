import ContentCard from "../../card/ContentCard";
import "./auth-card.scss";

function AuthCard({
  authType,
  children,
  height,
}: {
  authType: string;
  children: React.ReactNode;
  height: number;
}) {
  return (
    <div id={`${authType}-card`} className="auth-card">
      <ContentCard noPadding>
        <div
          id="block"
          style={{
            height: height ? `${height}px` : "333px",
          }}
        ></div>
        <div
          className="content-card-content"
          style={{
            minWidth: height / 1.5,
          }}
        >
          {children}
        </div>
      </ContentCard>
    </div>
  );
}

export default AuthCard;

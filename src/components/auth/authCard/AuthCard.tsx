import MainCard from "../../card/MainCard";
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
      <MainCard noPadding>
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
      </MainCard>
    </div>
  );
}

export default AuthCard;

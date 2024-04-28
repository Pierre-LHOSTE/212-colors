import { IconBrandGithubFilled } from "@tabler/icons-react";
import Button from "../../button/Button";
import ContentCard from "../../card/ContentCard";

function OAuthCard({ authType }: { authType: string }) {
  return (
    <div id={`${authType}-card`} className="auth-card">
      <ContentCard title="OAuth">
        <Button
          style={{
            backgroundColor: "#171515",
          }}
          type="default"
          icon={<IconBrandGithubFilled />}
        >
          Login with Github
        </Button>
      </ContentCard>
    </div>
  );
}

export default OAuthCard;

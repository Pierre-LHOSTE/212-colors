"use client";
import { DEFAULT_LOGIN_REDIRECT } from "@/src/lib/routes";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../../button/Button";
import ContentCard from "../../card/ContentCard";
import "./oauth-card.scss";

function OAuthCard({ authType }: { authType: string }) {
  const router = useRouter();

  return (
    <div className="auth-card oauth-card">
      <ContentCard
        sections={[
          {
            title: "OAuth",
            children: (
              <Button
                id="github-button"
                type="default"
                icon={<IconBrandGithubFilled />}
                onClick={async () => {
                  signIn("github", {
                    callbackUrl: DEFAULT_LOGIN_REDIRECT,
                  });
                }}
              >
                Login with Github
              </Button>
            ),
          },
          authType === "login"
            ? {
                title: "No account?",
                children: (
                  <Button
                    onClick={() => router.push("/auth/register")}
                    type="primary"
                  >
                    Create account
                  </Button>
                ),
              }
            : {
                title: "Already have an account?",
                children: (
                  <Button
                    onClick={() => router.push("/auth/login")}
                    type="primary"
                  >
                    Login
                  </Button>
                ),
              },
        ]}
      ></ContentCard>
    </div>
  );
}

export default OAuthCard;

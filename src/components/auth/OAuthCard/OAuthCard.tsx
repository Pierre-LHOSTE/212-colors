"use client";
import { useI18nContext } from "@/src/i18n/i18n-react";
import { DEFAULT_LOGIN_REDIRECT } from "@/src/lib/routes";
import { IconBrandGithubFilled } from "@tabler/icons-react";
import { Button } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MainCard from "../../card/MainCard";
import "./oauth-card.scss";

function OAuthCard({ authType }: { authType: string }) {
  const router = useRouter();
  const { LL } = useI18nContext();
  const [loading, setLoading] = useState(false);

  function githubLogin() {
    setLoading(true);
    signIn("github", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="auth-card oauth-card">
      <MainCard
        sections={[
          {
            title: "OAuth",
            children: (
              <Button
                id="github-button"
                type="default"
                icon={<IconBrandGithubFilled />}
                loading={loading}
                onClick={githubLogin}
              >
                {LL.profile.auth.oauth({ provider: "GitHub" })}
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
      />
    </div>
  );
}

export default OAuthCard;

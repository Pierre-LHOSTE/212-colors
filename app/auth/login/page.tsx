import OAuthCard from "@/src/components/auth/OAuthCard/OAuthCard";
import LoginCard from "@/src/components/auth/loginCard/LoginCard";

function LoginPage() {
  return (
    <>
      <LoginCard />
      <OAuthCard authType="login" />
    </>
  );
}

export default LoginPage;

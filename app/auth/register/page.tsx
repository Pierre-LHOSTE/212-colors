import OAuthCard from "@/src/components/auth/OAuthCard/OAuthCard";
import RegisterCard from "@/src/components/auth/registerCard/RegisterCard";

function LoginPage() {
  return (
    <>
      <RegisterCard />
      <OAuthCard authType="register" />
    </>
  );
}

export default LoginPage;

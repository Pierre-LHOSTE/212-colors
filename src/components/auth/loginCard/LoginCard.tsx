import AuthCard from "../authCard/AuthCard";
import LoginForm from "../loginForm/LoginForm";

function LoginCard() {
  return (
    <AuthCard authType="login" height={350}>
      <LoginForm />
    </AuthCard>
  );
}

export default LoginCard;

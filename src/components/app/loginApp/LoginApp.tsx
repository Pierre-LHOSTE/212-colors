import LoginCard from "../../auth/loginCard/LoginCard";
import App from "../ProjectLayout";

function LoginApp() {
  return (
    <App projects={[]}>
      <LoginCard />
    </App>
  );
}

export default LoginApp;

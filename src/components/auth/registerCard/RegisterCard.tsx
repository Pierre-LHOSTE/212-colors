import AuthCard from "../authCard/AuthCard";
import RegisterForm from "../registerForm/RegisterForm";

function RegisterCard() {
  return (
    <AuthCard authType="register" height={520}>
      <RegisterForm />
    </AuthCard>
  );
}

export default RegisterCard;

import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div className=" w-1/3">
      <CardWrapper
        label="Login"
        backHref="/"
        backLabel="Don't have an account."
      >
        <LoginForm />
      </CardWrapper>
    </div>
  );
};

export default LoginPage;

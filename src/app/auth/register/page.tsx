import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <div className="lg:w-1/3">
      <CardWrapper
        label="Register"
        backHref="/auth/login"
        backLabel="Go To Sign In"
      >
        <RegisterForm />
      </CardWrapper>
    </div>
  );
};

export default RegisterPage;

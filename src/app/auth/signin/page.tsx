import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/login-form";

import { AuthProvider } from "../context";

const SignInPage = async () => {
  return (
    <div className=" lg:w-1/3">
      <CardWrapper
        label="Sign IN"
        backHref="/auth/register"
        backLabel="Don't have an account."
      >
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </CardWrapper>
    </div>
  );
};

export default SignInPage;

import { useAuth0 } from "@auth0/auth0-react";
import { CardWithForm } from "./components/login-form";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <CardWithForm login={loginWithRedirect} />
      </div>
    </>
  );
};

export default Login;

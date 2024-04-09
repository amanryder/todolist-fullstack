import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function Test() {
  const {
    loginWithPopup,
    // loginWithRedirect,
    // logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  async function handleLogin() {
    await loginWithPopup();
  }

  async function handleClick() {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:3000/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleClickProtected() {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);

      const response = await axios.get("http://localhost:3000/protected", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="">
          <p>Todo List</p>
        </div>
        <div className="bg-blue-200" onClick={handleLogin}>
          Login with popup
        </div>
        {/* <div className="bg-blue-200" onClick={loginWithRedirect}>
          Login with redirect
        </div>
        {isAuthenticated && (
          <div className="bg-red-200" onClick={logout}>
            Logout
          </div>
        )} */}
        <h3>{isAuthenticated ? "logged in" : "logged out"}</h3>
        {isAuthenticated && <h3>{JSON.stringify(user)}</h3>}

        <div className="bg-green-400" onClick={handleClick}>
          {" "}
          Call normal route
        </div>
        <div className="bg-green-400" onClick={handleClickProtected}>
          {" "}
          Call protected route
        </div>
      </div>
    </>
  );
}

export default Test;

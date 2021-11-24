import GoogleLogin from "react-google-login";
import http from "axios-config";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
  let navigate = useNavigate();

  async function onGoogleLoginSuccess(googleAuth) {
    const values = JSON.stringify({
      token: googleAuth.tokenId,
    });
    await http
      .post("/users/google/login", values)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/dashboard");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("err: ", error);
      });
  }
  function onGoogleLoginFailure(error) {
    alert("Something wrong, please try again later!");
    console.log("error", error);
  }

  return (
    <GoogleLogin
      clientId="422658476305-fmoeo3bvcecjbitqisbldegt5cmmt34m.apps.googleusercontent.com"
      buttonText="Login With Google"
      onSuccess={onGoogleLoginSuccess}
      onFailure={onGoogleLoginFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

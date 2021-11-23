import GoogleLogin from 'react-google-login';
import http from "axios-config";

export default function GoogleLoginButton() {
    async function onGoogleLoginSuccess(googleAuth) {
        console.log('Success', googleAuth);
        const values = JSON.stringify({
            token: googleAuth.tokenId
          });
        await http.post("/users/google/login",values)
        .then((res) => {
            console.log(res.data);
            if (res.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(res.data));
            }
          })
          .catch((error) => {
            console.log("err: ", error);
          });
    }
    function onGoogleLoginFailure(error) {
        console.log('error', error);
    }

    return (
    <GoogleLogin
        fullWidth
        clientId="422658476305-fmoeo3bvcecjbitqisbldegt5cmmt34m.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
        cookiePolicy={'single_host_origin'}
    />
    )
}
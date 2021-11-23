import GoogleLogin from 'react-google-login';

export default function GoogleLoginButton() {
    function onGoogleLoginSuccess(googleAuth) {
        console.log('Success', googleAuth);
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
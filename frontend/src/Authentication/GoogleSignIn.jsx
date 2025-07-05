import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const GoogleSignIn = () => {
    const navigate = useNavigate();
    const handleSuccess = (credentialResponse) => {
        console.log("Google Sign-In Success:", credentialResponse);
        // Here you can handle the successful sign-in response
        // send this credentialResponse to your backend for further processing
        const decodedToken = jwtDecode(credentialResponse?.credential);
        console.log("Decoded Token:", decodedToken);
        
        navigate('/')
    }

    const handleError = (error) => {
        console.error("Google Sign-In Error:", error);
        // Handle the error response
    }

    return (
        <div>
            <GoogleOAuthProvider clientId="930728756729-b3da49veo26ku36160eg0kjgj923j0h2.apps.googleusercontent.com">
                <div className="google-signin">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </div>
            </GoogleOAuthProvider>
        </div>
    )
}



export default GoogleSignIn

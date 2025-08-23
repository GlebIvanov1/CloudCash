import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/slices/UserSlice";

const GoogleLoginButton: React.FC = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const dispatch = useDispatch();

  const GoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        dispatch(
          setUser({
            email: user.email,
            token,
            id: user.uid,
          }),
        );
      })
      .catch((e: any) => {
        alert(e.code);
      });
  };
  return (
    <>
      <div className={"GoogleLogin"} onClick={GoogleLogin}>
        <img width={33} src="/Imgs/GoogleIcon.svg" alt="GoogleImg" />
        <p>Sign in with Google</p>
      </div>
    </>
  );
};

export default GoogleLoginButton;

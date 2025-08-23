import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import GoogleLoginButton from "../../components/GoogleLoginButton,";
import useIsLogin from "../../Hooks/UseIsLogin";
import { setUser } from "../../Redux/slices/UserSlice";
import styles from "./styles.module.scss";

const LoginPage: React.FC = () => {
  const isLogin = useIsLogin();
  const redirect = useNavigate();
  const [EmailValue, setEmailValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();

  const Login = () => {
    try {
      signInWithEmailAndPassword(auth, EmailValue, PasswordValue)
        .then((userCredential) => {
          dispatch(
            setUser({
              EmailValue,
              PasswordValue,
              id: userCredential.user.uid,
            }),
          );
        })
        .catch((e: any) => {
          alert(e.code);
        });
    } catch (e: any) {
      alert(e.code);
    }
  };

  useEffect(() => {
    if (isLogin) {
      redirect("/");
    }
  }, [isLogin]);

  return (
    <>
      <div className={styles.LoginWrapper}>
        <h1>Welcome back!</h1>
        <h2>Enter your Credentials to access your account</h2>

        <div className={styles.EmailInputWrapper}>
          <h2>Email address</h2>
          <input
            value={EmailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.PasswordInputWrapper}>
          <h2>Password</h2>
          <input
            value={PasswordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            type="password"
            placeholder="Enter your password"
          />
          <a href="/Login/ForgotPassword">Forgot password?</a>
        </div>

        <div className={styles.Login} onClick={Login}>
          Login
        </div>

        <div className={styles.OrWrapper}>
          <div className={styles.LineLeft}></div>
          <p>or</p>
          <div className={styles.LineRight}></div>
        </div>

        <div style={{ marginTop: "50px" }}>
          <GoogleLoginButton />
        </div>
      </div>

      <div className={styles.HaveAccount}>
        <p>
          Don’t have an account? <a href="/Register">Sign Up</a>
        </p>
      </div>
    </>
  );
};

export default LoginPage;

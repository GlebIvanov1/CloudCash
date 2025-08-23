import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import GoogleLoginButton from "../../components/GoogleLoginButton,";
import useIsLogin from "../../Hooks/UseIsLogin";
import { setUser } from "../../Redux/slices/UserSlice";
import styles from "./styles.module.scss";

const RegisterPage: React.FC = () => {
  const redirect = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmTerms, setConfirmTerms] = useState(false);
  const isLogin = useIsLogin();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      redirect("/");
    }
  }, [isLogin]);

  const Signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        dispatch(
          setUser({
            id: userCredential.user.uid,
          }),
        );

        redirect("/Register/SetYourName");

        setEmail("");
        setPassword("");
      }
    } catch (e: any) {
      alert(e.code);
    }
  };

  return (
    <>
      <div className={styles.RegisterWrapper}>
        <h1>Get Started Now</h1>

        <div className={styles.EmailInputWrapper}>
          <h2>Email address</h2>
          <input
            type="email"
            className={styles.emailInput}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.PasswordInputWrapper}>
          <h2>Password</h2>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.AgreeToPolicy}>
          <input type="checkbox" onChange={() => setConfirmTerms(!confirmTerms)} />

          <span>
            I agree to the <a href="/TermsPolicy">terms & policy</a>
          </span>
        </div>

        <div
          className={styles.Signup}
          style={{ background: !confirmTerms ? "#aeaeae" : "" }}
          onClick={confirmTerms ? Signup : () => null}>
          Signup
        </div>

        <div className={styles.OrWrapper}>
          <div className={styles.LineLeft}></div>
          <p>or</p>
          <div className={styles.LineRight}></div>
        </div>

        <GoogleLoginButton />
      </div>

      <div className={styles.HaveAccount}>
        <p>
          Have an account? <a href="/Login">Sign in</a>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;

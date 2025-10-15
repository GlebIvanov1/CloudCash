import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import useIsLogin from "../../Hooks/UseIsLogin";
import { setLanguage } from "../../Redux/slices/ConfigurationSlice";
import { setUser } from "../../Redux/slices/UserSlice";
import styles from "./styles.module.scss";

const RegisterPage: React.FC = () => {
  const redirect = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmTerms, setConfirmTerms] = useState(false);
  const isLogin = useIsLogin();
  const language = useSelector((state: any) => state.configuration.language);
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

  const setLanguages = (language: any) => {
    localStorage.clear();
    localStorage.setItem("language", language);
    dispatch(setLanguage(language));
  };

  return (
    <>
      <div className={styles.RegisterWrapper}>
        <h1>{language === "English" ? "Get Started Now" : "Приступайте прямо сейчас"}</h1>

        <div className={styles.LanguageWrapper}>
          <p
            className={`${styles.Eng} ${language === "English" && styles.activeLanguage}`}
            onClick={() => setLanguages("English")}>
            Eng
          </p>{" "}
          <span className={styles.EngSeparator}>/</span>{" "}
          <p
            className={`${styles.Ru} ${language === "Русский" && styles.activeLanguage}`}
            onClick={() => setLanguages("Русский")}>
            Ru
          </p>
        </div>

        <div className={styles.EmailInputWrapper}>
          <h2>{language === "English" ? "Email address" : "Электронная почта"}</h2>
          <input
            type="email"
            className={styles.emailInput}
            placeholder={language === "English" ? "Enter your email" : "Введите вашу почту"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.PasswordInputWrapper}>
          <h2>{language === "English" ? "Password" : "Пароль"}</h2>
          <input
            type="password"
            placeholder={language === "English" ? "Enter your password" : "Введите ваш пароль"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.AgreeToPolicy}>
          <input type="checkbox" onChange={() => setConfirmTerms(!confirmTerms)} />

          <span>
            {language === "English" ? "I agree to the" : "Я согласен с"}{" "}
            <Link to="/TermsPolicy">
              {language === "English" ? "terms & policy" : "условиями & политикой"}
            </Link>
          </span>
        </div>

        <div
          className={styles.Signup}
          style={{ background: !confirmTerms ? "#aeaeae" : "" }}
          onClick={confirmTerms ? Signup : () => null}>
          {language === "English" ? "Signup" : "Регистрация"}
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
          {language === "English" ? "Have an account?" : "Уже зарегистрированы?"}{" "}
          <Link to="/Login">{language === "English" ? "Sign in" : "Войти"}</Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;

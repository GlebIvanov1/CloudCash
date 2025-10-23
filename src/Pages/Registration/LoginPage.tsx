import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import useIsLogin from "../../Hooks/UseIsLogin";
import { setLanguage } from "../../Redux/slices/ConfigurationSlice";
import { setUser } from "../../Redux/slices/UserSlice";
import styles from "./styles.module.scss";

const LoginPage: React.FC = () => {
  const isLogin = useIsLogin();
  const redirect = useNavigate();
  const [EmailValue, setEmailValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");
  const auth = getAuth();
  const language = useSelector((state: any) => state.configuration.language);
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

  const setLanguages = (language: any) => {
    localStorage.clear();
    localStorage.setItem("language", language);
    dispatch(setLanguage(language));
  };

  return (
    <>
      <div className={styles.LoginWrapper}>
        <h1>{language === "English" ? "Welcome back!" : "С возвращением!"}</h1>
        <h2>
          {language === "English"
            ? "Enter your Credentials to access your account"
            : "Введите свои учетные данные для доступа к вашему аккаунту"}
        </h2>

        <div className={styles.LanguageWrapper} style={{ top: "90px" }}>
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
            value={EmailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            type="email"
            placeholder={language === "English" ? "Enter your email" : "Введите вашу почту"}
          />
        </div>  

        <div className={styles.PasswordInputWrapper}>
          <h2>{language === "English" ? "Password" : "Пароль"}</h2>
          <input
            value={PasswordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            type="password"
            placeholder={language === "English" ? "Enter your password" : "Введите ваш пароль"}
          />
          <Link to="/Login/ForgotPassword">
            {language === "English" ? "Forgot password?" : "Забыли пароль?"}
          </Link>
        </div>

        <div className={styles.Login} onClick={Login}>
          {language === "English" ? "Login" : "Войти"}
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
          {language === "English" ? "Don’t have an account? " : "Не зарегистрированы? "}
          <Link to="/Register">{language === "English" ? "Sign Up" : "Зарегистрироваться"}</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;

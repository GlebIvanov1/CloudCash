import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { decrementVerifyCooldown, setVerifyCooldown } from "../../Redux/slices/VerifySlice";
import styles from "./styles.module.scss";

const ChangePassword: React.FC = () => {
  const language = useSelector((state: any) => state.configuration.language);
  const verifyColdown = useSelector((state: any) => state.Verify.verifyCooldown);
  const intervalRef = useRef<number | any>(null);
  const auth = getAuth();
  const email = useSelector((state: any) => state.User.email);
  const redirect = useNavigate();
  const dispatch = useDispatch();

  console.log(localStorage.getItem("verifyCooldown"));

  const sendVerifyCooldownAgain = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch(setVerifyCooldown(60));
      })
      .catch((e) => {
        alert(e.code);
      });
  };

  const DoneFunction = () => {
    const confirmChange = confirm(
      language === "English"
        ? "Are you sure you have changed your password? If not, just use your old one."
        : "Вы уверены, что сменили свой пароль? Если нет, просто используйте свой старый.",
    );

    if (confirmChange) {
      signOut(auth);
      redirect("/Login");
    }
  };

  useEffect(() => {
    try {
      if (verifyColdown > 0 && intervalRef.current === null) {
        intervalRef.current = window.setInterval(() => {
          dispatch(decrementVerifyCooldown());
        }, 1000);
      }
    } catch (e: any) {
      alert(e.code);
    }
  }, [verifyColdown]);

  useEffect(() => {
    if (verifyColdown <= 0) {
      window.clearInterval(intervalRef.current);
      dispatch(setVerifyCooldown(Number(localStorage.getItem("verifyCooldown"))));
      intervalRef.current = null;
    }
  }, [verifyColdown]);

  const Back = () => {
    window.clearInterval(intervalRef.current);
    dispatch(setVerifyCooldown(0));
    intervalRef.current = null;
  };

  return (
    <>
      <Link className={styles.ChangePasswordBack} to="/Settings" onClick={Back}>
        Back
      </Link>

      <div className={styles.ChangePasswordWrapper}>
        <h2>{language === "English" ? "Change password" : "Смена пароля"}</h2>

        <div className={styles.DoneButton} onClick={DoneFunction}>
          {language === "English" ? "I changed it" : "Я поменял пароль"}
        </div>
        <div
          style={{ color: verifyColdown !== 0 ? "#aeaeae" : "" }}
          className={styles.SendEmailVerificationAgain}
          onClick={verifyColdown === 0 ? sendVerifyCooldownAgain : () => null}>
          {language === "English"
            ? `${verifyColdown !== 0 ? verifyColdown : ""} Send email verification again`
            : `${verifyColdown !== 0 ? verifyColdown : ""} Отправить письмо с подтверждением снова`}
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

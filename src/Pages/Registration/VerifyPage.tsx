import { getAuth, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { decrementVerifyCooldown, setVerifyCooldown } from "../../Redux/slices/VerifySlice";
import styles from "./styles.module.scss";

const VerifyPage: React.FC = () => {
  const auth = getAuth();
  const verifyColdown = useSelector((state: any) => state.Verify.verifyCooldown);
  const intervalRef = useRef<number | any>(null);
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (verifyColdown <= 0) {
      window.clearInterval(intervalRef.current);
      dispatch(setVerifyCooldown(Number(localStorage.getItem("verifyCooldown"))));
      intervalRef.current = null;
    }

    user?.reload();
  }, [verifyColdown]);

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

  const confirmEmail = () => {
    user?.reload();

    if (user?.emailVerified) {
      redirect("/");
    }
  };

  const SendVerificationAgain = async () => {
    try {
      let user: any = auth.currentUser;

      await sendEmailVerification(user);

      alert("Email verification send again.");

      dispatch(setVerifyCooldown(60));

      if (intervalRef.current !== null) return;

      intervalRef.current = window.setInterval(() => {
        dispatch(decrementVerifyCooldown());
      }, 1000);
    } catch (e: any) {
      alert(e.code);
    }
  };

  const Back = () => {
    window.clearInterval(intervalRef.current);
    dispatch(setVerifyCooldown(Number(localStorage.getItem("verifyCooldown"))));
    intervalRef.current = null;
    user?.delete();
  };

  return (
    <>
      <Link to={"/Register"} className={styles.Back} onClick={Back}>
        Back
      </Link>
      <div className={styles.VerifyPageWrapper}>
        <h1>Verify your email address</h1>

        <div className={styles.ConfirmButton} onClick={confirmEmail}>
          I am confirmed
        </div>

        <div className={styles.Instruction}>
          <p>
            To complete the registration and activate your account, you need to verify your email
            address by checking your inbox. If you don't see the email we sent you, please check
            your spam folder. Once you confirm your email, click the "I'm confirmed" button. If you
            haven't yet received the email, click "Send verification email again".
          </p>
        </div>

        <span
          style={{ color: verifyColdown !== 0 ? "#aeaeae" : "" }}
          className={styles.VerificationEmailAgain}
          onClick={verifyColdown === 0 ? SendVerificationAgain : () => null}>
          {verifyColdown !== 0 && verifyColdown} Send verification email again
        </span>
      </div>
    </>
  );
};

export default VerifyPage;

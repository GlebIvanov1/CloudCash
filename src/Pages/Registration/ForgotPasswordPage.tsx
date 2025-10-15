import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./styles.module.scss";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const redirect = useNavigate();

  const confirmFunction = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("The password change email has been sent");
        setEmail("");
        redirect("/Login");
      })
      .catch((e: any) => {
        alert(`Error: ${e.code}`);
      });
  };

  return (
    <>
      <div className={styles.ForgotPasswordWrapper}>
        <h1>Reset password</h1>
        <h3>Enter the email address for your account to continue</h3>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className={styles.ConfrimButton} onClick={confirmFunction}>
          Confirm
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;

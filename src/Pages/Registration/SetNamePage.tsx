import { getAuth, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import useIsLogin from "../../Hooks/UseIsLogin";
import { setName } from "../../Redux/slices/UserSlice";
import { decrementVerifyCooldown, setVerifyCooldown } from "../../Redux/slices/VerifySlice";
import styles from "./styles.module.scss";

const SetNamePage: React.FC = () => {
  const intervalRef = useRef<number | any>(null);
  const dispatch = useDispatch();
  const auth = getAuth();
  const redirect = useNavigate();
  const isLogin = useIsLogin();
  const [name, setNameValue] = useState("");
  const [Lastname, setLastName] = useState("");
  const db = getDatabase();

  useEffect(() => {
    if (isLogin) {
      redirect("/");
    }
  }, [isLogin]);

  const Continue = async () => {
    const user: any = auth.currentUser;

    set(ref(db, "/users/" + auth.currentUser?.uid), {
      name: name,
      lastName: Lastname,
    });

    dispatch(
      setName({
        name,
        Lastname,
      }),
    );

    redirect("/Register/VerifyEmail");
    await sendEmailVerification(user);
    dispatch(setVerifyCooldown(60));

    if (intervalRef.current !== null) return;

    intervalRef.current = window.setInterval(() => {
      dispatch(decrementVerifyCooldown());
    }, 1000);

    if (user?.emailVerified) {
      alert("Email has been successfully confirmed!");
    }
  };

  return (
    <>
      <div className={styles.SetNameWrapper}>
        <h1>Set your name</h1>

        <div className={styles.EmailInputWrapper}>
          <h2>Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setNameValue(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className={styles.PasswordInputWrapper}>
          <h2>Last name</h2>
          <input
            type="text"
            value={Lastname}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </div>

        <div className={styles.Continue} onClick={Continue}>
          Continue
        </div>
      </div>
    </>
  );
};

export default SetNamePage;

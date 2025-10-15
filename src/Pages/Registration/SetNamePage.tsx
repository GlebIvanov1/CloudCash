import { getAuth, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import useIsLogin from "../../Hooks/UseIsLogin";
import { setName } from "../../Redux/slices/UserSlice";
import { setVerifyCooldown } from "../../Redux/slices/VerifySlice";
import styles from "./styles.module.scss";

const SetNamePage: React.FC = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const redirect = useNavigate();
  const isLogin = useIsLogin();
  const [name, setNameValue] = useState("");
  const [Lastname, setLastName] = useState("");
  const db = getDatabase();
  const user = auth.currentUser;

  useEffect(() => {
    if (isLogin) {
      redirect("/");
    }
  }, [isLogin]);

  const Continue = async () => {
    if (name && Lastname) {
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
      dispatch(setVerifyCooldown(0));
      await sendEmailVerification(user);
      dispatch(setVerifyCooldown(60));

      if (user?.emailVerified) {
        alert("Email has been successfully confirmed!");
      }
    } else {
      alert("You need to enter your name and last name.");
    }
  };

  const Back = () => {
    user?.delete();
  };

  return (
    <>
      <Link to={"/Register"} className={styles.Back} onClick={Back}>
        Back
      </Link>

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

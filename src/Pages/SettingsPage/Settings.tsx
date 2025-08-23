import { getAuth, signOut } from "firebase/auth";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../Redux/slices/ConfigurationSlice";
import styles from "./styles.module.scss";

const Settings: React.FC = () => {
  const auth = getAuth();
  const email = useSelector((state: any) => state.User.email);
  const date = new Date();
  const [dateInputValue, setDateInputValue] = useState("");
  const language = useSelector((state: any) => state.configuration.language);
  const dispatch = useDispatch();

  const setLanguages = (e: any) => {
    localStorage.clear();
    localStorage.setItem("language", e.target.value);
    dispatch(setLanguage(e.target.value));
  };

  const signOutFunction = () => {
    const confirmSignOut = confirm(
      language === "English"
        ? "Are you sure you wanna sign out?"
        : "Вы уверенны что хотите выйти из аккаунта?",
    );

    if (confirmSignOut) {
      signOut(auth);
    }
  };

  return (
    <>
      <div className={`Section ${styles.SettingsWrapper}`}>
        <h1>{language === "English" ? "Settings" : "Настройки"}</h1>

        <div className={styles.Settings}>
          <div className={styles.LanguagesWrapper}>
            <h3>{language === "English" ? "Select Language" : "Выберите язык"}</h3>

            <select value={language} className={styles.Languages} onChange={(e) => setLanguages(e)}>
              <option value="English">English</option>
              <option value="Русский">Русский</option>
            </select>
          </div>

          <h3
            className={styles.YourInfoTitle}
            style={{ transform: language === "Русский" ? "translate(80px)" : "" }}>
            {language === "English" ? "Your Info" : "Ваша информация"}
          </h3>

          <div className={styles.YourInfo}>
            <input
              className={styles.emailInput}
              type="email"
              value={email}
              disabled={email ? true : false}
            />

            {email && <img src="/Imgs/+.svg" alt="Delete" />}

            <input
              className={styles.phoneInput}
              type="tel"
              placeholder={language === "English" ? "Add Phone Number" : "Добавить номер телефона"}
            />

            <div className={styles.ConfirmButton}>
              {language === "English" ? "Confirm" : "Подтвердить"}
            </div>
          </div>

          <h3
            style={{ bottom: language === "Русский" ? "345px" : "" }}
            className={styles.BirthdayTitle}>
            {language === "English" ? "Your Birthday" : "Ваша дата рождения"}
          </h3>

          <div className={styles.Birth} style={{ bottom: language === "Русский" ? "260px" : "" }}>
            <input
              type="date"
              className={styles.AddNewGoalDateInput}
              max={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`}
              value={dateInputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDateInputValue(e.target.value)}
            />

            <div className={styles.ConfirmButton}>{language === 'English' ? 'Confirm' : 'Подтвердить'}</div>
          </div>

          <div className={styles.ChangePassword}>
            <h3>{language === "English" ? "Change password" : "Поменять пароль"}</h3>

            <div className={styles.ChangePasswordButton}>
              {language === "English" ? "Change password" : "Поменять пароль"}
            </div>
          </div>
        </div>

        <div className={styles.SignOut} onClick={signOutFunction}>
          {language === "English" ? "Sign out" : "Выйти из аккаунта"}
        </div>
      </div>
    </>
  );
};

export default Settings;

import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import "./App.scss";
import SidePanel from "./components/SidePanel";
import "./firebase.js";
import Cards from "./Pages/Card/Cards";
import Goals from "./Pages/Goals/Goals";
import Overview from "./Pages/Overview";
import ForgotPasswordPage from "./Pages/Registration/ForgotPasswordPage.js";
import LoginPage from "./Pages/Registration/LoginPage";
import RegisterPage from "./Pages/Registration/RegisterPage";
import SetNamePage from "./Pages/Registration/SetNamePage.js";
import VerifyPage from "./Pages/Registration/VerifyPage.js";
import ChangePassword from "./Pages/SettingsPage/ChangePassword.js";
import Settings from "./Pages/SettingsPage/Settings";
import TermsAndPolicy from "./Pages/TermsAndPolicy.js";
import Transactions from "./Pages/Transactions/Transactions";
import { setLanguage } from "./Redux/slices/ConfigurationSlice.js";
import { setName, setUser } from "./Redux/slices/UserSlice.js";
import { setVerifyCooldown } from "./Redux/slices/VerifySlice.js";

const App: React.FC = () => {
  const auth = getAuth(); 
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const href = location.href;
  const dbRef = ref(getDatabase());
  
  const LoginPageHrefs = [
    `/Register/VerifyEmail`,
    `/Register/SetYourName`,
    `/Login/ForgotPassword`,
    `/TermsPolicy`,
  ];

  useEffect(() => {
    dispatch(setLanguage(localStorage.getItem("language")));
    dispatch(setVerifyCooldown(Number(localStorage.getItem("verifyCooldown"))));
  }, []);

  onAuthStateChanged(auth, (user: any) => {
    if (user && user?.emailVerified) {
      get(child(dbRef, "/users/" + user.uid)).then((res) => {
        if (res.exists()) {
          let value = res.val();

          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.accessToken,
            }),
          );

          dispatch(
            setName({
              name: value.name,
              lastName: value.lastName,
            }),
          );
        }
      });
    } else {
      if (!LoginPageHrefs.includes(href)) {
        dispatch(
          setUser({
            email: "",
            id: "",
            token: "",
          }),
        );

        if (!user && ![`/Register`, `/Login`, `/TermsAndPolicy`].includes(location.pathname)) {
          redirect("/Register");
        }

        get(child(dbRef, "/users/" + user.uid)).then((res) => {
          let value = res.val();

          if (res.exists() && location.pathname !== `/Register` && href !== `/Login`) {
            if (user.emailVerified) {
              dispatch(
                setName({
                  name: value.name,
                  lastName: value.lastName,
                }),
              );    
            } else {
              try {
                redirect("/Register/VerifyEmail");

                sendEmailVerification(user);

                dispatch(setVerifyCooldown(60));
              } catch (e: any) {
                alert(e.code);
              }
            }
          } else {
            if (user.emailVerified) {
              redirect("/");
            } else if (location.pathname !== `/Register` && location.pathname !== `/Login`) {
              redirect("/Register/SetYourName");
            }
          }
        });
      }
    }
  });

  return (
    <>
      <img className="OblakoTop" src="./Imgs/Oblako.png" alt="" loading="lazy" />

      <div className="Wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SidePanel />
                <Overview />
              </>
            }
          />
          <Route
            path="/Transactions"
            element={
              <>
                <SidePanel />
                <Transactions />
              </>
            }
          />
          <Route
            path="/Cards"
            element={
              <>
                <SidePanel />
                <Cards />
              </>
            }
          />
          <Route
            path="/Goals"
            element={
              <>
                <SidePanel />
                <Goals />
              </>
            }
          />
          <Route
            path="/Settings"
            element={
              <>
                <SidePanel />                                             
                <Settings />
              </>
            }
          />

          <Route path="/Register/SetYourName" element={<SetNamePage />} />
          <Route path="/Register/VerifyEmail" element={<VerifyPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Login/ForgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/Settings/ChangePassword" element={<ChangePassword />} />
          <Route path="/TermsPolicy" element={<TermsAndPolicy />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const SidePanel: React.FC = () => {
  const [active, setActive] = useState(0);
  const host = useSelector((state: any) => state.configuration.host);
  const language = useSelector((state: any) => state.configuration.language);

  useEffect(() => {
    setActive(intideficateActive());
  }, []);

  const intideficateActive: () => number = () => {
    if (window.location.href == `${host}/`) {
      return 0;
    } else if (window.location.href == `${host}/Transactions`) {
      return 1;
    } else if (window.location.href == `${host}/Cards`) {
      return 2;
    } else if (
      window.location.href == `${host}/Goals` ||
      window.location.href == `${host}/Goals/AddNewGoal`
    ) {
      return 3;
    } else if (window.location.href == `${host}/Settings`) {
      return 4;
    }

    return 0;
  };

  const setActiveFunction = (id: number) => {
    setActive(id);
  };
  return (
    <>
      <div className="SideWrapper">
        <Link to={"/"}>
          <img
            onClick={() => setActiveFunction(0)}
            className="Logo"
            src="/Imgs/SideWrapper/SideWrapperLogo.svg"
            alt=""
          />
        </Link>

        <div className="Links">
          <Link
            style={{
              background: active == 0 ? "#F0F7FF" : "",
            }}
            onClick={() => setActiveFunction(0)}
            to={"/"}>
            <img src={`/Imgs/SideWrapper/Overview(${active == 0 ? "active" : "unactive"}).svg`} />{" "}
            <p
              style={{
                color: active == 0 ? "#197BBD" : "#C7C7C7",
              }}>
              {language === "English" ? "Overview" : "Главная"}
            </p>
          </Link>
          <Link
            style={{
              background: active == 1 ? "#F0F7FF" : "",
            }}
            onClick={() => setActiveFunction(1)}
            to={"/Transactions"}>
            <img
              src={`/Imgs/SideWrapper/Transactions(${active == 1 ? "active" : "unactive"}).svg`}
            />{" "}
            <p
              style={{
                color: active == 1 ? "#197BBD" : "#C7C7C7",
              }}>
              {language === "English" ? "Transactions" : "Транзакции"}
            </p>
          </Link>
          <Link
            style={{
              background: active == 2 ? "#F0F7FF" : "",
            }}
            onClick={() => setActiveFunction(2)}
            to={"/Cards"}>
            <img src={`/Imgs/SideWrapper/Cards(${active == 2 ? "active" : "unactive"}).svg`} />{" "}
            <p
              style={{
                color: active == 2 ? "#197BBD" : "#C7C7C7",
              }}>
              {language === "English" ? "Cards" : "Карты"}
            </p>
          </Link>
          <Link
            style={{
              background: active == 3 ? "#F0F7FF" : "",
            }}
            onClick={() => setActiveFunction(3)}
            to={"/Goals"}>
            <img src={`/Imgs/SideWrapper/Goals(${active == 3 ? "active" : "unactive"}).svg`} />{" "}
            <p
              style={{
                color: active == 3 ? "#197BBD" : "#C7C7C7",
              }}>
              {language === "English" ? "Goals" : "Цели"}
            </p>
          </Link>
          <Link
            style={{
              background: active == 4 ? "#F0F7FF" : "",
            }}
            onClick={() => setActiveFunction(4)}
            to={"/Settings"}>
            <img src={`/Imgs/SideWrapper/Settings(${active == 4 ? "active" : "unactive"}).svg`} />{" "}
            <p
              style={{
                color: active == 4 ? "#197BBD" : "#C7C7C7",
              }}>
              {language === "English" ? "Settings" : "Настройки"}
            </p>
          </Link>
        </div>

        <img className="GiveYourCashImg" src="/Imgs/GiveYourCash.svg" alt="" />
      </div>
    </>
  );
};

export default SidePanel;

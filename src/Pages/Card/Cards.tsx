import { Progress } from "antd";
import Cleave from "cleave.js";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewTransaction from "../../components/NewTransaction";
import OutcomeStatistics from "../../components/OutcomeStatistics";
import { SetDeactivateCard } from "../../Redux/slices/CardSlice";
import styles from "./styles.module.scss";

const Cards: React.FC = () => {
  const deactivateCard = useSelector((state: any) => state.Card.deactivate);
  const outcome = useSelector((state: any) => state.Balance.outcome);
  const cardInputRef = useRef<HTMLInputElement>(null);
  const ExpireDateRef = useRef<HTMLInputElement>(null);
  const name = useSelector((state: any) => state.User.name);
  const lastName = useSelector((state: any) => state.User.lastName);
  const dispatch = useDispatch();
  const language = useSelector((state: any) => state.configuration.language);

  useEffect(() => {
    if (cardInputRef.current) {
      new Cleave(cardInputRef.current, {
        blocks: [4, 4, 4, 4],
        delimiter: " ",
        numericOnly: true,
        creditCard: false,
      });
    }
  }, []);

  useEffect(() => {
    if (ExpireDateRef.current) {
      new Cleave(ExpireDateRef.current, {
        date: true,
        datePattern: ["m", "y"],
        dateMin: "01",
        dateMax: "12",
        delimiter: "/",
      });
    }
  }, []);

  return (
    <>
      <div className={`Section ${styles.CardsWrapper}`}>
        <h1>{language === "English" ? "Your cards" : "Ваши карты"}</h1>
        <p className={styles.UnderTitle}>
          {language === "English"
            ? "Here you can add a new card and view your card information"
            : "Здесь вы можете добавить новую карту и увидеть информацию о своих картах"}
        </p>

        <div className={`CardWrapper ${styles.CardWrapper}`}>
          <div className={`Card ${styles.Card}`}>
            <p>cloudcash</p>
            <p className="premiumAccount">PREMIUM ACCOUNT</p>

            <h3 className="CardNumber">5789 **** **** 2847</h3>

            <div className="CardHolder">
              <p className="Holder">Card holder</p>
              <p className="Name">
                {name} {lastName}
              </p>
            </div>

            <div className="ExpireDate">
              <p className="Expire">Expire date</p>
              <p className="Date">06/26</p>
            </div>

            <img src="/Imgs/Oblako.svg" alt="" />
          </div>

          <div className={`Balance ${styles.Balance}`}>
            <div className="CurrentBalance">
              <h2>
                <span>$</span> 2850.75
              </h2>
              <p>{language === "English" ? "Current balance" : "Текущий баланс"}</p>
            </div>

            <div className="Income">
              <h3>$ 1500.50</h3>
              <p>{language === "English" ? "Income" : "Доход"}</p>
            </div>

            <div className="Outcome">
              <h3>$ {outcome}</h3>
              <p style={{ marginLeft: language !== "English" ? "100px" : "" }}>
                {language === "English" ? "Outcome" : "Траты"}
              </p>
            </div>
          </div>

          <img
            src="/Imgs/Arrow.svg"
            alt="Arrow"
            className={`CardArrowLeft ${styles.CardArrowLeft}`}
          />
          <img
            src="/Imgs/Arrow.svg"
            alt="Arrow"
            className={`CardArrowRight ${styles.CardArrowRight}`}
          />

          <div className={`DeactivateCard ${styles.DeactivateCard}`}>
            <input
              type="checkbox"
              id="toggle"
              onChange={() => dispatch(SetDeactivateCard(!deactivateCard))}
            />
            <label htmlFor="toggle">
              <div className={`DeactivateSwitcher ${deactivateCard && "active"}`}></div>
            </label>

            <p
              style={{ marginLeft: deactivateCard ? "503px" : "" }}
              className={`Deactivate ${deactivateCard && "Active"}`}>
              {deactivateCard
                ? language === "English"
                  ? "Activate card"
                  : "Активировать"
                : language === "English"
                  ? "Deactivate card"
                  : "Деактивировать"}
            </p>
          </div>

          <div className={`WeeklyPaymentLimit`}>
            <div className="WeeklyPaymentLimitProgressBar">
              <Progress className="CompleteBar" percent={(outcome / 4000) * 100} showInfo={false} />
            </div>

            <p className="ProgressBarTitle">
              {language === "English" ? "Weekly payment limit" : "Еженедельный лимит"}
            </p>

            <p className="ProgressBarOutcome">${outcome} / $4000</p>
          </div>
        </div>

        <div className={`${styles.AddCardWrapper}`}>
          <h3>{language === "English" ? "Add new card" : "Добавить карту"}</h3>
          <img
            src="/Imgs/AddGoals.svg"
            style={{ marginLeft: language === "Русский" ? "270px" : "" }}
            className={styles.AddCardSvg}
            alt=""
          />

          <div className={`Card ${styles.Card}`}>
            <p>cloudcash</p>
            <p className="premiumAccount">PREMIUM ACCOUNT</p>

            <input
              ref={cardInputRef}
              className={styles.CardNumber}
              placeholder="xxxx xxxx xxxx xxxx"
            />

            <div className="CardHolder">
              <p className="Holder">Card holder</p>
              <p className="Name">
                {name} {lastName}
              </p>
            </div>

            <div className="ExpireDate">
              <p className="Expire">Expire date</p>
              <input
                className={styles.ExpirtDateInput}
                type="text"
                placeholder="xx/xx"
                ref={ExpireDateRef}
              />
            </div>

            <img src="/Imgs/Oblako.svg" alt="" />
          </div>

          <div
            style={{ width: language === "Русский" ? "250px" : "" }}
            className={styles.AddNewCard}>
            {language === "English" ? "Add new card" : "Добавить новую карту"}
          </div>
        </div>

        <div className={styles.OutcomeStatistics}>
          <OutcomeStatistics />
        </div>

        <div className={styles.NewTransaction}>
          <NewTransaction />
        </div>
      </div>
    </>
  );
};

export default Cards;

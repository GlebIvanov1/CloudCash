import { Progress } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GoalsCards from "../components/GoalsCard";
import OutcomeStatistics from "../components/OutcomeStatistics";
import TransactionCard from "../components/TransactionsCard";
import { SetDeactivateCard } from "../Redux/slices/CardSlice";

const Home: React.FC = () => {
  const deactivateCard = useSelector((state: any) => state.Card.deactivate);
  const outcome = useSelector((state: any) => state.Balance.outcome);
  const name = useSelector((state: any) => state.User.name);
  const lastName = useSelector((state: any) => state.User.lastName);
  const language = useSelector((state: any) => state.configuration.language);
  const dispatch = useDispatch();

  const deactivateCardFunction = () => {
    const confirmDeactivate = confirm(
      language === "English"
        ? "Are you sure you wanna deactivate your card?"
        : "Вы уверенны что хотите деактивировать данную карту?",
    );

    if (confirmDeactivate) {
      dispatch(SetDeactivateCard(!deactivateCard));
    }
  };

  return (
    <>
      <div className="Section OverviewWrapper">
        <h1>{language === "English" ? "Weekly sumup" : "Еженедельные итоги"}</h1>
        <p className="UnderTitle">
          {language === "English"
            ? "Get summary of your weekly online transactions here"
            : "Ознакомьтесь со сводкой ваших еженедельных онлайн-транзакций здесь"}
        </p>

        <div className="AccountInfo">
          <img className="Mail" src="/Imgs/mail.svg" alt="mail" />
          <img className="Notification" src="/Imgs/Notification(active).svg" alt="notification" />

          <div className="UserImg">
            <img src="/Imgs/User.svg" alt="User" />

            <div className="UserInfo">
              <p className="Name">{name}</p>
              <p className="AccountStatus">User-account</p>
            </div>
          </div>
        </div>

        <div className="CardWrapper">
          <h3>{language === "English" ? "Cards" : "Карты"}</h3>

          <div className="Card">
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

          <div className="Balance">
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

          <img src="/Imgs/Arrow.svg" alt="Arrow" className="CardArrowLeft" />
          <img src="/Imgs/Arrow.svg" alt="Arrow" className="CardArrowRight" />

          <div className="DeactivateCard">
            <input type="checkbox" id="toggle" onChange={deactivateCardFunction} />
            <label htmlFor="toggle">
              <div className={`DeactivateSwitcher ${deactivateCard && "active"}`}></div>
            </label>

            <p
              style={{
                marginLeft: deactivateCard ? "503px" : "",
                fontSize: language !== "English" ? "15px" : "",
              }}
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

          <div className="WeeklyPaymentLimit">
            <div className="WeeklyPaymentLimitProgressBar">
              <Progress className="CompleteBar" percent={(outcome / 4000) * 100} showInfo={false} />
            </div>

            <p className="ProgressBarTitle">
              {language === "English" ? "Weekly payment limit" : "Еженедельный лимит"}
            </p>

            <p className="ProgressBarOutcome">${outcome} / $4000</p>
          </div>
        </div>

        <div className="Goals">
          <h3 className="Title">
            {language === "English" ? "Goals" : "Цели"}{" "}
            <img src="/Imgs/AddGoals.svg" alt="AddGoals" />
          </h3>

          <div className="GoalsWrapper">
            <GoalsCards price={550} date="09/20/25" type="Holidays" />
            <GoalsCards price={200} date="12/20/25" type="Renovation" />

            <img className="Arrow" src="/Imgs/Arrow.svg" alt="next" />
          </div>
        </div>

        <OutcomeStatistics />

        <div className="TransactionsHistory">
          <h3>{language === "English" ? "Transaction history" : "История транзакций"}</h3>

          <div className="Recivier">
            <p>{language === "English" ? "Reciever" : "Получатель"}</p>
            <p className="Type">{language === "English" ? "Type" : "Тип"}</p>
            <p className="Date">{language === "English" ? "Date" : "Дата"}</p>
            <p style={{ marginLeft: language === "Русский" ? "7px" : "" }} className="Amount">
              {language === "English" ? "Amount" : "Сумма"}
            </p>
          </div>

          <TransactionCard
            Recivier="Tesco Market"
            Type="Transaction"
            Date="15 Dec 2025"
            Amount={75.76}
          />
          <TransactionCard
            Recivier="Mark Ivanov"
            Type="Transaction"
            Date="16 Dec 2025"
            Amount={260.0}
          />
          <TransactionCard
            Recivier="Irina Markova"
            Type="Transaction"
            Date="30 Dec 2025"
            Amount={500.54}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import GoalsCards from "../../components/GoalsCard";
import styles from "./styles.module.scss";

const Goals: React.FC = () => {
  const [amountInputValue, SetAmountInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState("");
  const [goalInputValue, setGoalInputValue] = useState("");
  const language = useSelector((state: any) => state.configuration.language);
  const date = new Date();

  const inputOnChange = (e: any) => {
    if ((Number(e.target.value) && !e.target.value.includes(".")) || e.target.value === "") {
      SetAmountInputValue(e.target.value);
    }
  };
  return (
    <>
      <div className={`Section ${styles.GoalsWrapper}`}>
        <h1 className={styles.UncompletedGoalsTitle}>
          {language === "English" ? "Uncompleted Goals" : "Невыполненные цели"}
        </h1>

        <div className={styles.UncompletedGoals}>
          <GoalsCards price={350} date="09/21/25" type="Holidays" />
          <GoalsCards price={500} date="11/28/25" type="Holidays" />
          <GoalsCards price={909} date="12/31/25" type="Holidays" />
          <GoalsCards price={999} date="01/15/26" type="Holidays" />
          <GoalsCards price={405} date="02/25/26" type="Holidays" />
          <GoalsCards price={690} date="09/29/26" type="Holidays" />
        </div>

        <div className={styles.CompletedGoalsWrapper}>
          <h2 className={styles.Title}>
            {language === "English" ? "Completed Goals" : "Выполненые цели"}
          </h2>

          <div className={styles.CompletedGoalsCardWrapper}>
            <GoalsCards price={999} date="01/15/26" type="Holidays" />
            <GoalsCards price={405} date="02/25/26" type="Holidays" />
            <GoalsCards price={405} date="02/25/26" type="Holidays" />
            <GoalsCards price={690} date="09/29/26" type="Holidays" />
            <GoalsCards price={405} date="02/25/26" type="Holidays" />
            <GoalsCards price={690} date="09/29/26" type="Holidays" />
            <GoalsCards price={690} date="09/29/26" type="Holidays" />
          </div>
        </div>

        <div className={styles.AddMewGoalsWrapper}>
          <h2 className={styles.Title}>
            {language === "English" ? "Add a new goal" : "Добавить новую цель"}
          </h2>

          <input
            type="text"
            placeholder={language === "English" ? "Amount" : "Сумма"}
            maxLength={5}
            value={amountInputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => inputOnChange(e)}
            className={styles.AddNewGoalAmoutInput}
          />

          <h3 className={styles.AddNewGoalDollarSign}>$</h3>

          <input
            type="date"
            className={styles.AddNewGoalDateInput}
            min={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`}
            value={dateInputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDateInputValue(e.target.value)}
          />

          <input
            type="text"
            className={styles.AddNewGoalType}
            placeholder={language === "English" ? "Your Goal" : "Твоя цель"}
            maxLength={11}
            value={goalInputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setGoalInputValue(!Number(e.target.value) ? e.target.value : goalInputValue)
            }
          />

          <img
            width={28}
            height={28}
            src="/Imgs/HolidayIImgGray.svg"
            className={styles.AddNewGoalTypeImg}
            alt="Goal"
          />

          <div className={styles.AddNewGoalButton}>
            {language === "English" ? "Add new goal" : "Добавить новую цель"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Goals;

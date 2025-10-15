import React, { useState } from "react";
import { useSelector } from "react-redux";

const NewTransaction: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const language = useSelector((state: any) => state.configuration.language);

  const inputValueChange = (e: any) => {
    if ((Number(e.target.value) && !e.target.value.includes(".")) || e.target.value === "") {
      setInputValue(e.target.value);
    }
  };
  return (
    <>
      <div className={"NewTransaction"}>
        <p>{language === "English" ? "New transaction" : "Новая транзакция"}</p>

        <div className={"AddNew"}>
          <img src="/OptimiziedSvg/AddGoals.svg" alt="AddNew" />
          <span>{language === "English" ? "Add New" : "Добавить"}</span>
        </div>

        <input
          value={inputValue}
          onChange={(e) => inputValueChange(e)}
          type="text"
          min={0}
          placeholder="0"
          maxLength={5}
        />
        <img className={"dollar"} src="/OptimiziedSvg/$.svg" alt="" />

        <div className="Send">{language === "English" ? "Send the transfer" : "Отправить"}</div>
      </div>
    </>
  );
};

export default NewTransaction;

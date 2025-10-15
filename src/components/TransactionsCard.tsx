import React from "react";

interface TransactionCardType {
  Recivier: string;
  Type: string;
  Date: string;
  Amount: number;
}

const TransactionCard: React.FC<TransactionCardType> = ({ Recivier, Type, Date, Amount }) => {
  return (
    <>
      <div className="wrapper">
        <div className="TransactionCard">
          <div className="Resivier">
            <img src="/OptimiziedSvg/TransactionUser.svg" alt="User" />
          </div>

          <p className="Reciviers">{Recivier}</p>
          <p className="Type">{Type}</p>
          <p className="Date">{Date}</p>
          <p className="Amount">${Amount}</p>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;

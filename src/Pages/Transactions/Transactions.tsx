import React from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import NewTransaction from "../../components/NewTransaction";
import TransactionCard from "../../components/TransactionsCard";
import styles from "./styles.module.scss";

interface ChartData {
  name: string;
  income: number;
  outcome: number;
}

interface RechartsExampleProps {
  data: ChartData[];
}

const barData = [
  { name: "January", income: 400, outcome: -300 },
  { name: "February", income: 300, outcome: -250 },
  { name: "March", income: 600, outcome: -800 },
  { name: "April", income: 800, outcome: -150 },
  { name: "May", income: 500, outcome: -1000 },
  { name: "June", income: 900, outcome: -835 },
  { name: "July", income: 500, outcome: -150 },
  { name: "August", income: 250, outcome: -250 },
  { name: "September", income: 1000, outcome: -800 },
  { name: "October", income: 367, outcome: -150 },
  { name: "November", income: 873, outcome: -800 },
  { name: "December", income: 901, outcome: -300 },
];

const Rechart: React.FC<RechartsExampleProps> = ({ data }) => {
  return (
    <div className={styles.Chart}>
      <ResponsiveContainer style={{ transform: "translate(-50px)" }} width="100%" height={380}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#0fa42a" />
          <Bar dataKey="outcome" fill="#ff0000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Transactions: React.FC = () => {
  const language = useSelector((state: any) => state.configuration.language);

  return (
    <>
      <div className={`Section ${styles.TransactionsWrapper}`}>
        <Rechart data={barData} />

        <div
          className={styles.TransactionHistory}
          style={{ paddingRight: language === "Русский" ? "50px" : "" }}>
          <h1>{language === "English" ? "Transaction history" : "История транзакций"}</h1>

          <div className={`Recivier ${styles.Recivier}`}>
            <p>{language === "English" ? "Reciever" : "Получатель"}</p>
            <p className={styles.Type}>{language === "English" ? "Type" : "Тип"}</p>
            <p className={styles.Date}>{language === "English" ? "Date" : "Дата"}</p>
            <p
              className={styles.Amount}
              style={{ marginLeft: language === "Русский" ? "23px" : "" }}>
              {language === "English" ? "Amount" : "Сумма"}
            </p>
          </div>

          <div className={styles.TransactionCardWrapper}>
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

        <div className={styles.NewTransaction}>
          <NewTransaction />
        </div>
      </div>
    </>
  );
};

export default Transactions;

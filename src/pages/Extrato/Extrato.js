import { useParams } from "react-router-dom";
import Logo from "../../assets/logo/logo_preto.png";
import { useEffect, useState } from "react";
import axios from "axios";

import "./style.css";

export function Extrato() {
  const [userInfo, setUserInfo] = useState();
  const [transactions, setTransactions] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");

      try {
        const [userResponse, transactionsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/v1/users/${id}`, {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(
            `http://localhost:8080/api/v1/users/${id}/report-transactions`,
            {
              headers: {
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);
        console.log("user", userResponse.data);
        console.log("tran", transactionsResponse.data.data);
        setUserInfo(userResponse.data);
        setTransactions(transactionsResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (userInfo && transactions) {
      window.print();
    }
  }, [userInfo, transactions]);

  if (!userInfo || !transactions) return <p>Loading...</p>;

  const date = new Date();

  console.log("a", transactions);

  return (
    <>
      <div className="containerExtrato">
        <h1 style={{ marginBottom: "70px" }}>Historial de Transações</h1>
        <header>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <img src={Logo} width="90" />
            <h1>DWS</h1>
          </span>
          <span style={{ display: "flex", flexDirection: "column" }}>
            <h1>{`${date.getDay()}-${date.getMonth()}-${date.getFullYear()} ${date
              .getHours()
              .toString()
              .padStart(2, 0)}:${date
              .getMinutes()
              .toString()
              .padStart(2, 0)}`}</h1>
            <h1>{userInfo.name}</h1>
          </span>
        </header>
        <div>
          <table>
            <tr>
              <th>data</th>
              <th>total</th>
              <th>tipo transação</th>
              <th>accountCreditID</th>
              <th>accountDebitID</th>
              <th>currencyCred</th>
            </tr>
            {transactions.map((transaction) => {
              const created = new Date(transaction.createdString.split("[")[0]);
              return (
                <tr>
                  <td>{`${created.getDay().toString().padStart(2, 0)}-${created
                    .getMonth()
                    .toString()
                    .padStart(2, 0)}-${created.getFullYear()} ${created
                    .getHours()
                    .toString()
                    .padStart(2, 0)}:${created
                    .getMinutes()
                    .toString()
                    .padStart(2, 0)}`}</td>
                  <td>{transaction.totalAmount}</td>
                  <td>{transaction.transactionType}</td>
                  <td>{transaction.accountCreditID}</td>
                  <td>{transaction.accountDebitID}</td>
                  <td>{transaction.currencyCred}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
